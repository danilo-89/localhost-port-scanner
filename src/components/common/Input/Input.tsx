import {
    ChangeEventHandler,
    FocusEventHandler,
    ForwardedRef,
    forwardRef,
} from 'react'

// TS
interface IProps {
    type: HTMLInputElement['type']
    name?: string
    id?: string
    step?: number
    min?: string | number
    max?: string | number
    readOnly?: boolean
    required?: boolean
    value?: string | number
    defaultValue?: string | number
    placeholder?: string
    showError?: boolean
    errorText?: string
    className?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    onBlur?: FocusEventHandler<HTMLInputElement>
    onFocus?: FocusEventHandler<HTMLInputElement>
}

const Input = forwardRef(
    (
        {
            name,
            type,
            step,
            min,
            max,
            id,
            required,
            readOnly,
            placeholder,
            value,
            defaultValue,
            showError,
            errorText,
            className,
            onChange,
            onBlur,
            onFocus,
        }: IProps,
        forwardedRef: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <div className="relative">
                <input
                    ref={forwardedRef}
                    name={name}
                    id={id}
                    type={type}
                    step={step}
                    min={min}
                    max={max}
                    placeholder={placeholder}
                    required={required}
                    readOnly={readOnly}
                    value={value}
                    defaultValue={defaultValue}
                    className={className}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
                {showError ? (
                    <span className="absolute -bottom-1 left-1 block translate-y-full text-sm text-[red]">
                        {errorText ?? <>&nbsp;</>}
                    </span>
                ) : null}
            </div>
        )
    }
)

Input.displayName = 'Input'
export default Input
