import { FormProvider, useForm } from "react-hook-form";

const FormWrapper = ({
    children,
    onSubmit,
    defaultValues = {},
    className = ""
}) => {

    const methods = useForm({ defaultValues });

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={`w-full max-w-md space-y-4 ${className}`}
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default FormWrapper;