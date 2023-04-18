import styled from "styled-components";
import Field from "./FormField";
import { useState } from "react";
import CommandNotFound from "./commands/CommandNotFound";
// interface Props {
//   id: string;
// }
interface formDataObj {
  [key: string]: {
    name: string;
    value: string | number;
    required: boolean;
    isUrl?: boolean;
    isEmail?: boolean;
    isNumber?: boolean;
    min?: number;
    max?: number;
  };
}
const FormContainer = styled.form`
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  align-content: center;
  height: 100%;
  margin-bottom: 1rem;
`;

const QueryCode = (props: any) => {
  const [formData, setFormData] = useState<formDataObj>({
    baseURL: {
      name: "Base URL",
      value: "",
      required: true,
      isUrl: true,
    },
    starttingPageURL: {
      name: "Starting Page URL",
      value: "",
      required: true,
      isUrl: true,
    },
    email: {
      name: "Email",
      value: "",
      required: false,
      isEmail: true,
    },
    maxLevel: {
      name: "Level",
      value: 0,
      required: true,
      isNumber: true,
      min: 1,
      max: 10,
    },
  });

  const validateFormData = (data: formDataObj) => {
    let isValid = true;
    const faildValidations: { name: string; error: string }[] = [];
    for (const field in data) {
      const value = data[field].value;
      const numVal = data[field].value! as Number;
      for (const rule in data[field]) {
        switch (rule) {
          case "required":
            isValid = isValid && value.toString().trim().length > 0;
            if (!isValid) {
              faildValidations.push({
                name: data[field].name,
                error: "Input should be non-empty!",
              });
            }
            break;
          case "isUrl":
            isValid =
              isValid &&
              value
                .toString()
                .trim()
                .match(
                  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
                ) !== null;
            if (!isValid) {
              faildValidations.push({
                name: data[field].name,
                error: "Input is not a valid URL!",
              });
            }
            break;
          case "isEmail":
            isValid =
              isValid &&
              value
                .toString()
                .trim()
                .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== null;
            if (!isValid) {
              faildValidations.push({
                name: data[field].name,
                error: "Input is not a valid Email!",
              });
            }
            break;
          case "isNumber":
            isValid = isValid && !Number.isNaN(value);
            if (!isValid) {
              faildValidations.push({
                name: data[field].name,
                error: "Input should be number!",
              });
            }
            break;
          case "min":
            let min = data[field].min! as Number;
            isValid = isValid && !Number.isNaN(value) && numVal >= min;
            if (!isValid) {
              faildValidations.push({
                name: data[field].name,
                error: `Input should be max than ${min}!`,
              });
            }
            break;
          case "max":
            const max = data[field].max! as Number;
            isValid = isValid && !Number.isNaN(value) && numVal <= max;
            if (!isValid) {
              faildValidations.push({
                name: data[field].name,
                error: `Input should be min than ${max}!`,
              });
            }
            break;
        }
      }
    }
    console.log(faildValidations)
    if(faildValidations.length){
      
      const errorsMessages =  faildValidations.map(error => {
        return <CommandNotFound fieldName={error.name} error={error.error}/>
      })
      props.printErrors(errorsMessages);
    } else {
      props.printErrors();
    }
  };

  return (
    <FormContainer>
      <Field
        autoFocus={true}
        isVariable={true}
        id="baseURL"
        variableType="const"
        variableName="_domain_URL"
        type="URL"
        inputType="url"
        placeholder="Enter Domain URL"
        value={formData.baseURL}
        inputHandler={(e: any) =>
          setFormData({
            ...formData,
            baseURL: { ...formData.baseURL, value: e.target.value },
          })
        }
      />
      <Field
        autoFocus={false}
        isVariable={true}
        id="starttingPageURL"
        variableType="const"
        variableName="_start_page_URL"
        type="URL"
        inputType="url"
        placeholder="Enter Starting Page URL"
        value={formData.starttingPageURL}
        inputHandler={(e: any) =>
          setFormData({
            ...formData,
            starttingPageURL: {
              ...formData.starttingPageURL,
              value: e.target.value,
            },
          })
        }
      />
      <Field
        autoFocus={false}
        isVariable={true}
        id="email"
        variableType="const"
        variableName="_your_email"
        type="email"
        inputType="email"
        placeholder="Enter your Email Address (Optional)"
        value={formData.email}
        inputHandler={(e: any) =>
          setFormData({
            ...formData,
            email: { ...formData.email, value: e.target.value },
          })
        }
      />
      <Field
        autoFocus={false}
        isVariable={true}
        id="maxLevel"
        variableType="const"
        variableName="_level_deep"
        type="number"
        inputType="number"
        placeholder="Enter crawling deepness level"
        value={formData.maxLevel}
        inputHandler={(e: any) =>
          setFormData({
            ...formData,
            maxLevel: { ...formData.maxLevel, value: Number(e.target.value) },
          })
        }
      />
      <Field
        autoFocus={false}
        isVariable={false}
        id="submitHandler"
        variableName="click_me_to_submit_query"
        inputHandler={() => validateFormData(formData)}
      />
      {/* 
      

      <FormField>
        <Label>
          <span className="variable_name function">
            {"click_me_to_submit_query();"}
          </span>
        </Label>
      </FormField> */}
    </FormContainer>
  );
};

export default QueryCode;
