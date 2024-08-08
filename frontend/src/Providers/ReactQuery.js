'use client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";


export const ReactQueryProvider = ({ children }) =>  {
const [queryClient] =useState(()=> new QueryClient())
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}