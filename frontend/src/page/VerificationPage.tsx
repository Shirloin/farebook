import { useMutation } from "@apollo/client";
import { VERIFY_USER } from "../query/UserQuery";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function VerificationPage() {
    const { email } = useParams()

    const [verifyUser, {loading, error }] = useMutation(VERIFY_USER, {
        variables: {
            email: email
        },
    });
    useEffect(() => {
        async function verifyAndNavigate() {
            await verifyUser();
            return <Navigate to={'/login'} />;
        }
        
        verifyAndNavigate();
    }, [verifyUser]);

    if (loading) {
        return <h1>Verification...</h1>;
    }
    if (error) {
        return <h1>Verification Failed: {error.message}</h1>;
        verifyUser
    }
    return (
        <>
        <Navigate to={'/login'} />
        </>
    )
}