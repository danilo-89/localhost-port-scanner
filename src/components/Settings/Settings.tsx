import { useEffect } from 'react'
import z from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Contexts
import { usePortsForScanningContext } from '@/context/PortsForScanningContext'

// Components
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

// Schemas
const numberOrEmptyStringSchema = z.union([
    z.preprocess(
        (input) => (input === '' ? input : Number(input)),
        z
            .number()
            .int()
            .min(0, { message: 'min: 0' })
            .max(65535, { message: 'max: 65535' })
            .optional()
    ),
    z.string().refine((value) => value === '', {
        message: 'The string must be empty',
    }),
])

const formSchema = z
    .object({
        showRange: z.boolean(),
        inputLeft: numberOrEmptyStringSchema,
        inputRight: numberOrEmptyStringSchema,
        inputSingle: numberOrEmptyStringSchema,
    })
    .superRefine((data, ctx) => {
        if (data.showRange === true) {
            if (
                typeof data.inputLeft !== 'number' ||
                typeof data.inputRight !== 'number'
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Invalid inputs based on the showRange value',
                })
            } else if (!(data.inputRight > data.inputLeft)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `must be less than right input`,
                    path: ['inputLeft'],
                })
            }
        }

        if (data.showRange === false && typeof data.inputSingle !== 'number') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Invalid inputs based on the showRange value',
            })
        }
    })

// TS
type FormSchema = z.infer<typeof formSchema>

const Settings = () => {
    const { state, dispatch } = usePortsForScanningContext()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
        reset,
        trigger,
    } = useForm<FormSchema>({
        defaultValues: {
            showRange: false,
            inputLeft: '',
            inputRight: '',
            inputSingle: '',
        },
        mode: 'onChange',
        resolver: zodResolver(formSchema),
    })

    const showRange = watch('showRange')
    const inputRight = watch('inputRight')

    useEffect(() => {
        trigger('inputLeft')
    }, [inputRight, trigger])

    useEffect(() => {
        reset({
            showRange,
            inputLeft: '',
            inputRight: '',
            inputSingle: '',
        })
    }, [showRange, reset])

    const addToState: SubmitHandler<FormSchema> = (formData) => {
        const { showRange, inputLeft, inputRight, inputSingle } = formData

        if (
            showRange &&
            typeof inputLeft === 'number' &&
            typeof inputRight === 'number'
        ) {
            dispatch({ name: 'add', payload: [inputLeft, inputRight] })
        } else if (!showRange && typeof inputSingle === 'number') {
            dispatch({ name: 'add', payload: inputSingle })
        }
    }
    return (
        <div className="w-[30rem] bg-yankeesBlue">
            <div className="mb-4 bg-darkGunmetal p-4">
                <h2 className="text-lg font-bold">Settings</h2>
            </div>
            <div className="p-5">
                <span className="mb-1 inline-block pl-2 text-sm uppercase text-manatee">
                    Current ports for scanning
                </span>
                <div className="styled-scrollbar mb-8 flex h-[7.5rem] flex-wrap content-start justify-start gap-2 overflow-auto rounded-lg bg-charcoal p-2">
                    {state.map((item: number | [number, number], idx) => {
                        const itemValue = Array.isArray(item)
                            ? item.join(' - ')
                            : item

                        return (
                            <span
                                className="inline-block rounded-full bg-yankeesBlue px-3 py-2 text-sm"
                                key={itemValue}
                            >
                                {itemValue}
                                <Button
                                    type="button"
                                    variation="neutral"
                                    size="sm"
                                    className="ml-2 rounded-full"
                                    onClick={() =>
                                        dispatch({
                                            name: 'remove',
                                            payload: idx,
                                        })
                                    }
                                >
                                    x
                                </Button>
                            </span>
                        )
                    })}
                </div>

                <span className="mb-1 inline-block pl-2 text-sm uppercase text-manatee">
                    Add ports for scanning
                </span>
                <form
                    onSubmit={handleSubmit(addToState)}
                    className="rounded-lg border-2 border-charcoal p-4 "
                >
                    <div className="mb-10 flex items-center">
                        {showRange ? (
                            <div className="flex items-center">
                                <div>
                                    <Input
                                        key="inputLeft"
                                        step={1}
                                        min={0}
                                        max={65_535}
                                        className="w-[9rem] border py-1.5 pl-4 pr-1"
                                        type="number"
                                        id="inputLeft"
                                        placeholder="port number"
                                        {...register('inputLeft')}
                                        showError
                                        errorText={errors?.inputLeft?.message}
                                    />
                                </div>

                                <span className="mx-3 inline-block">-</span>
                                <div>
                                    <Input
                                        key="inputRight"
                                        step={1}
                                        min={0}
                                        max={65_535}
                                        className="w-[9rem] border py-1.5 pl-4 pr-1"
                                        type="number"
                                        id="inputRight"
                                        placeholder="port number"
                                        {...register('inputRight')}
                                        showError
                                        errorText={errors?.inputRight?.message}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Input
                                    key="inputSingle"
                                    step={1}
                                    min={0}
                                    max={65_535}
                                    className="w-[9rem] border py-1.5 pl-4 pr-1"
                                    type="number"
                                    id="inputSingle"
                                    placeholder="port number"
                                    {...register('inputSingle')}
                                    showError
                                    errorText={errors?.inputSingle?.message}
                                />
                            </div>
                        )}
                        <div className="ml-auto flex items-center">
                            <input
                                type="checkbox"
                                id="showRange"
                                {...register('showRange')}
                                className="mr-1"
                            />
                            <label htmlFor="showRange">range</label>
                        </div>
                    </div>

                    <div>{errors?.root?.message}</div>

                    <div className="text-center">
                        <Button
                            type="submit"
                            variation="tertiary"
                            size="md"
                            disabled={!isValid || isSubmitting}
                        >
                            Add Ports
                        </Button>
                    </div>
                </form>
                <br />
            </div>
        </div>
    )
}

export default Settings
