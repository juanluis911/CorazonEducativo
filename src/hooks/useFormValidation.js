// src/hooks/useFormValidation.js
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      if (rule.required && (!value || value.toString().trim() === '')) {
        return rule.message || `${name} es requerido`;
      }
      
      if (rule.minLength && value && value.length < rule.minLength) {
        return rule.message || `${name} debe tener al menos ${rule.minLength} caracteres`;
      }
      
      if (rule.maxLength && value && value.length > rule.maxLength) {
        return rule.message || `${name} debe tener máximo ${rule.maxLength} caracteres`;
      }
      
      if (rule.pattern && value && !rule.pattern.test(value)) {
        return rule.message || `${name} tiene un formato inválido`;
      }
      
      if (rule.validate && value) {
        const customError = rule.validate(value, values);
        if (customError) return customError;
      }
    }
    
    return '';
  };

  const validateForm = (valuesToValidate = values) => {
    const newErrors = {};
    let formIsValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, valuesToValidate[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  const setValue = (name, value) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    
    // Validar campo individual si ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const setTouchedField = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validar cuando se marca como tocado
    const error = validateField(name, values[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsValid(false);
  };

  // Re-validar cuando cambian los valores
  useEffect(() => {
    const hasAnyTouched = Object.values(touched).some(Boolean);
    if (hasAnyTouched) {
      validateForm();
    }
  }, [values, touched]);

  return {
    values,
    errors,
    touched,
    isValid,
    setValue,
    setTouchedField,
    validateForm,
    reset,
    getFieldProps: (name) => ({
      value: values[name] || '',
      onChange: (e) => setValue(name, e.target.value),
      onBlur: () => setTouchedField(name),
      error: touched[name] ? errors[name] : '',
    })
  };
};
