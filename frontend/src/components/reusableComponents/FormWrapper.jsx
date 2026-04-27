import { FormProvider, useForm } from "react-hook-form";

const FormWrapper = ({
    children,
    onSubmit,
    defaultValues = {}
}) => {

    const methods = useForm({ defaultValues });

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="max-w-md mx-auto p-6 shadow-md rounded-lg bg-white"
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default FormWrapper;