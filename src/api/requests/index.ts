import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
                .in('status', ['approved', 'rejected'])
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


export const useInsertCompantLeaves = () => {
    return useMutation({
        async mutationFn(data: any) {
            const { error, data: newLeaves } = await supabase.from('companyLeaves').insert({
                title: data.title,
                start_date: data.start_date,
                end_date: data.end_date,
                image: data.image
            })
                .single()

            if (error) {
                throw new Error(error.message);
            }
            return newLeaves
        }
    })
}


export const useCompanyLeaves = () => {
    return useQuery({
        queryKey: ['CompanyLeaves'],
        queryFn: async () => {
            const { data, error } = await supabase.from('companyLeaves')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw new Error(error.message);
            }
            return data
        }
    })
}



export const useStatusChange = () => {
    const queryClient = useQueryClient();
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
        },
        onSuccess: () => {
            // Invalidate the LeaveRequestsActive query to trigger a refetch
            queryClient.invalidateQueries(['LeaveRequestsActive']);
            queryClient.invalidateQueries(['LeaveRequestsArchive']);
        },
    })
}