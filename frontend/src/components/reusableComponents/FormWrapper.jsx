import { FormProvider, useForm } from "react-hook-form";

const FormWrapper = ({
    children,
    onSubmit,
    defaultvalues = {}
}) => {

    const methods = useForm({defaultValues});
    return(
        <>
        <FormProvider>
            <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 shadow-md rounded-lg bg-white"
            >
                {children}
            </form>
        </FormProvider>
        </>
    )
}

export default FormWrapper;