import {
    PropsWithChildren,
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react';
import { Employee } from '@/types';
import employees from '@assets/data/employee';

type CartType = {
    employees: Employee[];
    addEmployeeItem: (employee: Employee,) => void;
    // updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

const CartContext = createContext<CartType>({
    employees: employees,
    addEmployeeItem: () => { },
    // updateQuantity: () => { },
    // total: 0,
});

const EmployeeProvider = ({ children }: PropsWithChildren) => {
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);

    // console.log(employeeList)

    useEffect(() => {
        setEmployeeList(employees);
    }, []);

    const addEmployeeItem = (employee: Employee) => {
        setEmployeeList([...employeeList, employee]);
    };

    // const updateQuantity = (itemId: string, amount: -1 | 1) => {
    //     // ... existing code ...
    // };

    return (
        <CartContext.Provider value={{ employees: employeeList, addEmployeeItem }} >
            {children}
        </CartContext.Provider>
    );
};

export default EmployeeProvider;

export const useCart = () => useContext(CartContext);
