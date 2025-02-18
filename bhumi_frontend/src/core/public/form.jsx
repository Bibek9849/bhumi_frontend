import { useForm } from "react-hook-form"
import { useRegisterUser } from "./query"

function UserForm() {

    const { register, handleSubmit } = useForm()
    const saveApi = useRegisterUser()

    const submit = (data) => {
        console.log(data)

        const formData = new FormData();
        formData.append("fullName", data?.fullName)
        formData.append("email", data?.email)
        formData.append("contact", data?.contact)
        formData.append("password", data?.password)
        saveApi.mutate(formData, {
            onSuccess: (res) => {
                alert(res)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(submit)}>

            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow text-gray-900 placeholder-gray-500" placeholder="Full Name" {...register("fullName")} />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="email" className="grow text-gray-900 placeholder-gray-500" placeholder="Email"  {...register("email")} />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow text-gray-900 placeholder-gray-500" placeholder="Contact"  {...register("contact")} />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="password" className="grow text-gray-900 placeholder-gray-500" placeholder="Password" {...register("password")} />
                </label>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="password" className="grow text-gray-900 placeholder-gray-500" placeholder="Confirm Password" />
                </label>
            </div>
            <div>
                <button type="submit" className="flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                    Register
                </button>
            </div>
        </form>
    )

}