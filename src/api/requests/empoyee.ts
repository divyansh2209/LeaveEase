import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useRequestListByUserId = (userId: string) => {
    return useQuery({
        queryKey: ['LeaveRequest', userId],
        queryFn: async () => {
            const { data, error } = await supabase.from('leaveRequests')
                .select('*')
                .eq('userId', userId)
                .order('created_at', { ascending: false });
            if (error) {
                throw new Error(error.message);
            }
            return data
        }

    })
}