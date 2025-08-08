import React, { useEffect, useRef, useState } from 'react'
import { BudgetPlan } from '../model/BudgetPlan'
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore'
import { db } from '@renderer/FirebaseConfig'

const fetchBudgetPlanData: () => Promise<BudgetPlan[]> = async () => {
  const q = query(collection(db, 'budgetPlan'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    const {
      budgetPlanId,
      budgetPlanName,
      budgetPlanDescription,
      budgetPlanAmount,
      budgetPlanDate,
      budgetPlanStatus
    } = doc.data()
    const budgetPlan: BudgetPlan = {
      budgetPlanId: budgetPlanId,
      budgetPlanName: budgetPlanName,
      budgetPlanDescription: budgetPlanDescription,
      budgetPlanAmount: budgetPlanAmount,
      budgetPlanDate: budgetPlanDate,
      budgetPlanStatus: budgetPlanStatus
    }
    return budgetPlan
  })
}

const deleteBudgetPlanData = async (budgetPlanName: string) => {
  const q = query(collection(db, 'budgetPlan'), where('budgetPlanName', '==', budgetPlanName))
  const querySnapshot = await getDocs(q)
  querySnapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

const ViewBudgetPlan = () => {
  const [budgetPlan, setBudgetPlan] = useState<BudgetPlan[] | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedBudgetPlan, setSelectedBudgetPlan] = useState<BudgetPlan | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBudgetPlanData().then((budgetPlan) => setBudgetPlan(budgetPlan))
  }, [])

  const handleDelete = async (budgetPlanName: string) => {
    await deleteBudgetPlanData(budgetPlanName)
    // Refresh the budget plan data after deletion
    fetchBudgetPlanData().then((budgetPlan) => setBudgetPlan(budgetPlan))
  }

  const handleEdit = (budgetPlan: BudgetPlan) => {
    setSelectedBudgetPlan(budgetPlan)
    setEditModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const q = query(
      collection(db, 'budgetPlan'),
      where('budgetPlanName', '==', selectedBudgetPlan?.budgetPlanName)
    )
    const querySnapshot = await getDocs(q)
    const doc = querySnapshot.docs[0]
    try {
      const docRef = doc.ref
      await updateDoc(docRef, {
        budgetPlanName: nameRef.current?.value,
        budgetPlanDescription: descriptionRef.current?.value,
        budgetPlanAmount: amountRef.current?.value,
        budgetPlanDate: dateRef.current?.value,
        budgetPlanStatus: statusRef.current?.value
      })
      fetchBudgetPlanData().then((budgetPlan) => setBudgetPlan(budgetPlan))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {budgetPlan?.map((budgetPlan, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <div>
            <div className="font-bold text-blue-500 text-2xl"> {budgetPlan.budgetPlanName}</div>
            <div>
              <strong>Description : </strong>
              {budgetPlan.budgetPlanDescription}
            </div>
            <div>
              <strong>Amount : </strong>
              {budgetPlan.budgetPlanAmount}
            </div>
            <div>
              <strong>Date : </strong>
              {budgetPlan.budgetPlanDate}
            </div>
            <div>
              <strong>Status : </strong>
              {budgetPlan.budgetPlanStatus}
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(budgetPlan.budgetPlanName)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleEdit(budgetPlan)}
          >
            Edit
          </button>
        </div>
      ))}
      {editModalOpen && selectedBudgetPlan && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <label className="text-gray-600">Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBudgetPlan.budgetPlanName}
                />
                <label className="text-gray-600">Description</label>
                <input
                  ref={descriptionRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBudgetPlan.budgetPlanDescription}
                />
                <label className="text-gray-600">Amount</label>
                <input
                  ref={amountRef}
                  type="number"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBudgetPlan.budgetPlanAmount}
                />
                <label className="text-gray-600">Date</label>
                <input
                  ref={dateRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBudgetPlan.budgetPlanDate}
                />
                <label className="text-gray-600">Status</label>
                <input
                  ref={statusRef}
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  defaultValue={selectedBudgetPlan.budgetPlanStatus}
                />
                {error && <span className="text-red-500">{error}</span>}
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                  Update Budget Plan
                </button>
                <button
                  className="bg-red-500 text-white rounded-md p-2 mt-2"
                  onClick={() => setEditModalOpen(false)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewBudgetPlan
