import React, { useRef } from 'react'
import { BudgetPlan } from '../model/BudgetPlan'
import { CreateNewBudgetPlan } from '../controller/BudgetPlanController'

const CreateBudgetPlanPage = () => {
  const budgetPlanNameRef = useRef<HTMLInputElement>(null)
  const budgetPlanDescriptionRef = useRef<HTMLInputElement>(null)
  const budgetPlanAmountRef = useRef<HTMLInputElement>(null)
  const budgetPlanDateRef = useRef<HTMLInputElement>(null)
  const budgetPlanStatusRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      budgetPlanNameRef?.current?.value &&
      budgetPlanDescriptionRef?.current?.value &&
      budgetPlanAmountRef?.current?.value &&
      budgetPlanDateRef?.current?.value &&
      budgetPlanStatusRef?.current?.value
    ) {
      const data: BudgetPlan = {
        budgetPlanId: '',
        budgetPlanName: budgetPlanNameRef.current?.value,
        budgetPlanDescription: budgetPlanDescriptionRef.current?.value,
        budgetPlanAmount: parseFloat(budgetPlanAmountRef.current?.value),
        budgetPlanDate: budgetPlanDateRef.current?.value,
        budgetPlanStatus: budgetPlanStatusRef.current?.value
      }

      CreateNewBudgetPlan(data)
    }
  }

  return (
    <div className="text-start">
      <div className="text-center mt-10 mb-10">
        <strong className="text-2xl font-bold mb-4">Create New Budget Plan</strong>
      </div>
      <form className="flex flex-col px-20">
        <label className="text-gray-600">Budget Plan Name</label>
        <input
          ref={budgetPlanNameRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Budget Plan Description</label>
        <input
          ref={budgetPlanDescriptionRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Budget Plan Amount</label>
        <input
          ref={budgetPlanAmountRef}
          type="number"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Budget Plan Date</label>
        <input
          ref={budgetPlanDateRef}
          type="date"
          className="border border-gray-300 rounded-md p-2"
        />
        <label className="text-gray-600">Budget Plan Status</label>
        <input
          ref={budgetPlanStatusRef}
          type="text"
          className="border border-gray-300 rounded-md p-2"
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md p-2 mt-4">
          Create Budget Plan
        </button>
      </form>
    </div>
  )
}

export default CreateBudgetPlanPage
