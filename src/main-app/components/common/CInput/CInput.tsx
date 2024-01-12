import { useId } from 'react';
import cn from 'classnames';

interface CInputProps {
  varient?: 'default' | 'outlined' | 'filled';
  labelClasses?: string;
  inputClasses?: string;
  containerClasses?: string;
  type?: 'text' | 'password';
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
  label?: string;
  required?: boolean
}

const CInput: React.FC<CInputProps> = ({
  varient = 'default',
  labelClasses = '',
  inputClasses = '',
  containerClasses = '',
  type = 'text',
  placeholder = '',
  label = '',
  required=false,
  ...rest
}) => {
  const id = useId();
  const styles = {
    default: {
      input: cn(
        'block py-2.5 px-0 w-full text-sm text-gray-900',
        'bg-transparent border-0 border-b-2 border-gray-300',
        'appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer',
        // 'dark:text-white dark:border-gray-600 dark:focus:border-blue-500'
      ),
      label: cn(
        'absolute text-sm text-gray-500 peer-placeholder-shown:scale-100',
        'duration-300 transform -translate-y-6 scale-75 top-3',
        '-z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600',
        'peer-focus:dark:text-blue-500 dark:text-gray-400',
        'peer-placeholder-shown:translate-y-0 peer-focus:scale-75',
        'peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
      )
    },
    filled: {
      input: cn(
        'block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm',
        'text-gray-900 bg-gray-50  border-0',
        'border-b-2 border-gray-300 appearance-none focus:outline-none',
        'focus:ring-0 focus:border-blue-600 peer'
        // 'dark:border-gray-600 dark:focus:border-blue-500 dark:bg-gray-700 dark:text-white'
      ),
      label: cn(
        'absolute text-sm text-gray-500 peer-placeholder-shown:scale-100',
        'duration-300 transform -translate-y-4 scale-75 top-4',
        'z-10 origin-[0] start-2.5 peer-focus:text-blue-600',
        'peer-placeholder-shown:translate-y-0 peer-focus:scale-75',
        'peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
        // 'peer-focus:dark:text-blue-500 dark:text-gray-400'
      )
    },
    outlined: {
      input: cn(
        'block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900',
        'bg-transparent rounded-lg border-2 border-gray-800',
        'appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
        // 'dark:focus:border-blue-500 dark:text-white dark:border-gray-600'
      ),
      label: cn(
        'absolute text-sm text-gray-500 peer-placeholder-shown:scale-100',
        'duration-300 transform -translate-y-4 scale-75 top-2',
        'z-10 origin-[0] bg-white px-2',
        'peer-focus:px-2 peer-focus:text-blue-600',
        'peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2',
        'peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4',
        'rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
        // 'peer-focus:dark:text-blue-500 dark:text-gray-400 dark:bg-gray-900',
      )
    }
  };
  return (
    <span
      className={cn('block relative', {
        [containerClasses]: containerClasses != ''
      })}
    >
      <input
        type={type}
        id={`${varient}_${id}`}
        className={cn(styles[varient].input, {
          [inputClasses]: inputClasses != ''
        })}
        placeholder={placeholder}
        required={required}
        {...rest}
      />
      {label != '' && (
        <label
          htmlFor={`${varient}_${id}`}
          className={cn(styles[varient].label, {
            [labelClasses]: inputClasses != ''
          })}
        >
          {label}
        </label>
      )}
    </span>
  );
};

export default CInput;
