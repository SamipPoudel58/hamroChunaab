import React from 'react';
import { useFormContext } from 'react-hook-form';

const Select = ({
  name,
  options,
}: {
  name: string;
  options: Record<string, string>;
}) => {
  const { register } = useFormContext();
  return (
    <div className="">
      <label className="block mb-1 text-slate-600" htmlFor={name}>
        Gender
      </label>
      <select {...register(name)} id={name}>
        {Object.keys(options).map((key) => (
          <option key={key} value={options[key]}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
