import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### messages

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | uuid        | string | true     |
| user_id    | uuid        | string | false    |
| content    | text        | string | true     |
| created_at | timestamptz | string | false    |

### comments

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | uuid        | string | true     |
| idea_id    | uuid        | string | false    |
| user_id    | uuid        | string | false    |
| content    | text        | string | true     |
| created_at | timestamptz | string | false    |

### ideas

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | uuid        | string | true     |
| user_id    | uuid        | string | false    |
| title      | text        | string | true     |
| description| text        | string | false    |
| created_at | timestamptz | string | false    |

### users

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | uuid        | string | true     |
| username   | text        | string | true     |
| email      | text        | string | true     |
| created_at | timestamptz | string | false    |

*/

// Hooks for messages
export const useMessages = () => useQuery({
    queryKey: ['messages'],
    queryFn: () => fromSupabase(supabase.from('messages').select('*')),
});
export const useMessage = (id) => useQuery({
    queryKey: ['messages', id],
    queryFn: () => fromSupabase(supabase.from('messages').select('*').eq('id', id).single()),
});
export const useAddMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMessage) => fromSupabase(supabase.from('messages').insert([newMessage])),
        onSuccess: () => {
            queryClient.invalidateQueries('messages');
        },
    });
};
export const useUpdateMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedMessage) => fromSupabase(supabase.from('messages').update(updatedMessage).eq('id', updatedMessage.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('messages');
        },
    });
};
export const useDeleteMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('messages').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('messages');
        },
    });
};

// Hooks for comments
export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});
export const useComment = (id) => useQuery({
    queryKey: ['comments', id],
    queryFn: () => fromSupabase(supabase.from('comments').select('*').eq('id', id).single()),
});
export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};
export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedComment) => fromSupabase(supabase.from('comments').update(updatedComment).eq('id', updatedComment.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};
export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('comments').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

// Hooks for ideas
export const useIdeas = () => useQuery({
    queryKey: ['ideas'],
    queryFn: () => fromSupabase(supabase.from('ideas').select('*')),
});
export const useIdea = (id) => useQuery({
    queryKey: ['ideas', id],
    queryFn: () => fromSupabase(supabase.from('ideas').select('*').eq('id', id).single()),
});
export const useAddIdea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newIdea) => fromSupabase(supabase.from('ideas').insert([newIdea])),
        onSuccess: () => {
            queryClient.invalidateQueries('ideas');
        },
    });
};
export const useUpdateIdea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedIdea) => fromSupabase(supabase.from('ideas').update(updatedIdea).eq('id', updatedIdea.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('ideas');
        },
    });
};
export const useDeleteIdea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('ideas').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('ideas');
        },
    });
};

// Hooks for users
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*')),
});
export const useUser = (id) => useQuery({
    queryKey: ['users', id],
    queryFn: () => fromSupabase(supabase.from('users').select('*').eq('id', id).single()),
});
export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUser) => fromSupabase(supabase.from('users').update(updatedUser).eq('id', updatedUser.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('users').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};