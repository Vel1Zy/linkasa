import {Employee} from "../Interfaces/EmployeeInterface";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, employees} from '../FirebaseConfig/firebaseConfig'
import {addDoc} from "firebase/firestore";

const groundHandlingStaff: Employee[] = [
    {
        name: 'John Doe',
        dob: new Date('1985-03-15'),
        gender: 'Male',
        email: 'john.doe@example.com',
        companyEmail: 'john.doe@company.com',
        password: 'password123',
        role: 'GroundHandlingStaff',
        schedule: [],
    },
    {
        name: 'Jane Smith',
        dob: new Date('1990-08-22'),
        gender: 'Female',
        email: 'jane.smith@example.com',
        companyEmail: 'jane.smith@company.com',
        password: 'securePassword',
        role: 'GroundHandlingStaff',
        schedule: [],
    },
    {
        name: 'Robert Johnson',
        dob: new Date('1982-11-10'),
        gender: 'Male',
        email: 'robert.j@example.com',
        companyEmail: 'robert.j@company.com',
        password: 'pass123',
        role: 'GroundHandlingStaff',
        schedule: [],
    },
    {
        name: 'Emily Davis',
        dob: new Date('1988-06-28'),
        gender: 'Female',
        email: 'emily.davis@example.com',
        companyEmail: 'emily.davis@company.com',
        password: 'strongPassword',
        role: 'GroundHandlingStaff',
        schedule: [],
    },
    {
        name: 'Michael White',
        dob: new Date('1980-09-05'),
        gender: 'Male',
        email: 'michael.white@example.com',
        companyEmail: 'michael.white@company.com',
        password: 'securePass456',
        role: 'GroundHandlingStaff',
        schedule: [],
    },
    {
        name: 'Samantha Brown',
        dob: new Date('1995-04-18'),
        gender: 'Female',
        email: 'samantha.b@example.com',
        companyEmail: 'samantha.b@company.com',
        password: 'samanthaPass',
        role: 'GroundHandlingStaff',
        schedule: [],
    },
    {
        name: 'Daniel Clark',
        dob: new Date('1987-12-03'),
        gender: 'Male',
        email: 'daniel.clark@example.com',
        companyEmail: 'daniel.clark@company.com',
        password: 'danielPass789',
        role: 'GroundHandlingStaff',
        schedule: [],
    },
    {
        name: 'Amanda Lewis',
        dob: new Date('1992-10-15'),
        gender: 'Female',
        email: 'amanda.lewis@example.com',
        companyEmail: 'amanda.lewis@company.com',
        password: 'amandaSecurePass',
        role: 'GroundHandlingStaff',
        schedule: [],
    },
    {
        name: 'Ethan Turner',
        dob: new Date('1984-07-25'),
        gender: 'Male',
        email: 'ethan.turner@example.com',
        companyEmail: 'ethan.turner@company.com',
        password: 'ethanPass123',
        role: 'GroundHandlingStaff',
        schedule: [],
    },
    {
        name: 'Olivia Parker',
        dob: new Date('1998-02-12'),
        gender: 'Female',
        email: 'olivia.parker@example.com',
        companyEmail: 'olivia.parker@company.com',
        password: 'oliviaSecurePass',
        role: 'GroundHandlingStaff',
        schedule: [],
    },
    {
        name: 'Nathan Evans',
        dob: new Date('1989-09-30'),
        gender: 'Male',
        email: 'nathan.evans@example.com',
        companyEmail: 'nathan.evans@company.com',
        password: 'nathanPass456',
        role: 'GroundHandlingStaff',
        schedule: [],
    },
    // Add more entries as needed
];

const addGroundStaff = async () => {
    for (const staff of groundHandlingStaff) {
        await createUserWithEmailAndPassword(auth, staff.companyEmail, staff.password)
        await addDoc(employees, staff)
    }
}

export { addGroundStaff }
