import { NativeStackScreenProps } from "@react-navigation/native-stack";
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}


export type Employee = {
    id: number;
    name: string;
    position: string;
};

export type LeaveRequest = {
    id: number;
    title: string;
    type: string;
    message: string;
    userId: number,
    status: string,
    start_date: string,
    end_date: string,
    feedback: string,
    created_at: Date,
};

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;

