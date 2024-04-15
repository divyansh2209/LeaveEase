import { supabase } from "@/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRequestListActive = () => {
    return useQuery({
        queryKey: ['LeaveRequestsActive'],
        queryFn: async () => {
            const { data, error } = await supabase.from('leaveRequests')
                .select('*')
                .eq('status', 'pending')
                .order('created_at', { ascending: false });

            if (error) {
                throw new Error(error.message);
            }
            return data
        }

    })
}

export const useRequestListArchive = () => {
    return useQuery({
        queryKey: ['LeaveRequestsArchive'],
        queryFn: async () => {
            const { data, error } = await supabase.from('leaveRequests')
                .select('*')
                .in('status', ['Approved', 'Rejected'])
                .order('created_at', { ascending: false });
            if (error) {
                throw new Error(error.message);
            }
            return data
        }

    })
}

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

export const useRequestListByReqId = (reqId: number) => {
    return useQuery({
        queryKey: ['LeaveRequestDetail', reqId],
        queryFn: async () => {
            const { data, error } = await supabase.from('leaveRequests')
                .select('*')
                .eq('id', reqId)
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data
        }

    })
}

export const useInsertRequest = () => {

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: newRequest } = await supabase.from('leaveRequests').insert({
                title: data.title,
                type: data.type,
                message: data.message,
                userId: data.userId,
                status: data.status,
                start_date: data.start_date,
                end_date: data.end_date
            })
                .single()

            if (error) {
                throw new Error(error.message);
            }
            return newRequest
        }
    })
}

export const useStatusChange = () => {

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: updatedRequest } = await supabase
                .from('leaveRequests')
                .update({
                    title: data.title,
                    type: data.type,
                    message: data.message,
                    userId: data.userId,
                    status: data.status,
                    start_date: data.start_date,
                    end_date: data.end_date,
                    feedback: data.feedback
                })
                .eq( 'id', data.id )
                .select()
                .single()

            if (error) {
                throw new Error(error.message);
            }
            return updatedRequest
        }
    })
}