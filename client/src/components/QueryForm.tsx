import styled from "styled-components";
import Field from "./FormField";
import React, { ReactElement, useState } from "react";
import CommandNotFound from "./commands/CommandNotFound";
import Logging from "./commands/Logging";
import { LogType } from "../types";
import axios from "axios";
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
interface payload {
  baseURL: string,
  starttingPageURL: string,
  email: string,
  maxLevel: number
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
  max-width: 40%;
  width: 100%;
  padding: 3rem 2rem;
  border-right: 1px solid #103d24;
`;

const SubmitButton = styled.button`
  background-color: #052c16;
  color: #50fa7b;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 7px;
  line-height: 1.25rem;
  padding: 0.5rem 1rem;
`;

const ListItem = styled.li ``;
const OderedList = styled.ol ``;

const QueryForm = (props: any) => {
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

  const submitFormHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if(props.isTaskCompleted){
        props.clearTerminal();
      }
      props.setLoading(true);
      props.printErrors("validating query inputs...", LogType.HAPPNING, Math.random().toString());
      const isValid = validateFormData();
      if(isValid){
        props.printErrors("All inputs are validated!", LogType.CHECK, Math.random().toString());
        props.printErrors("Connecting to backend service...", LogType.CONNECTION, Math.random().toString());
        const payload: payload = {
          baseURL: formData.baseURL.value as string,
          starttingPageURL: formData.starttingPageURL.value as string,
          email: formData.email.value as string,
          maxLevel: formData.maxLevel.value as number
        };
        const response = await axios.post("https://us-central1-webcrawlernode.cloudfunctions.net/crawler/create", payload);
        if(response?.data?.taskId){
          props.setTaskId(response.data.taskId);
        }
      } else {
        props.printErrors("Please fill form fields with valid inputs...", LogType.WARNING, Math.random().toString());
      }
    } catch (error: any) {
      props.printErrors(error.message, LogType.ERROR, Math.random().toString());
      } finally {
      props.setLoading(false);
    }
  }

  const validateFormData = () => {
    const data = { ...formData };
    let isValid = true;
    const faildValidations: { name: string; error: string }[] = [];
    for (const field in data) {
      let isFieldValid = true;
      const value = data[field].value;
      const numVal = data[field].value! as Number;
      for (const rule in data[field]) {
        switch (rule) {
          case "required":
            isFieldValid = isFieldValid && value.toString().trim().length > 0;
            if (!isFieldValid) {
              faildValidations.push({
                name: data[field].name,
                error: "Input should be non-empty!",
              });
            }
            isValid = isValid && isFieldValid;
            break;
          case "isUrl":
            isFieldValid =
              isFieldValid &&
              value
                .toString()
                .trim()
                .match(
                  /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
                ) !== null;
            if (!isFieldValid) {
              faildValidations.push({
                name: data[field].name,
                error: "Input is not a valid URL!",
              });
            }
            isValid = isValid && isFieldValid;
            break;
          case "isEmail":
            isFieldValid =
              isFieldValid &&
              value
                .toString()
                .trim()
                .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== null;
            if (!isFieldValid) {
              faildValidations.push({
                name: data[field].name,
                error: "Input is not a valid Email!",
              });
            }
            isValid = isValid && isFieldValid;
            break;
          case "isNumber":
            isFieldValid = isFieldValid && !Number.isNaN(value);
            if (!isFieldValid) {
              faildValidations.push({
                name: data[field].name,
                error: "Input should be number!",
              });
            }
            isValid = isValid && isFieldValid;
            break;
          case "min":
            let min = data[field].min! as Number;
            isFieldValid = isFieldValid && !Number.isNaN(value) && numVal >= min;
            if (!isFieldValid) {
              faildValidations.push({
                name: data[field].name,
                error: `Input should be max than ${min}!`,
              });
            }
            isValid = isValid && isFieldValid;
            break;
          case "max":
            const max = data[field].max! as Number;
            isFieldValid = isFieldValid && !Number.isNaN(value) && numVal <= max;
            if (!isFieldValid) {
              faildValidations.push({
                name: data[field].name,
                error: `Input should be min than ${max}!`,
              });
            }
            isValid = isValid && isFieldValid;
            break;
        }
      }
    }
    if (faildValidations.length) {
      const errorsMessages: ReactElement[] = Object.entries(
        faildValidations.reduce(
          (
            prev: { [key: string]: string[] },
            curr: { name: string; error: string }
          ) => {
            if (!prev[curr.name]) {
              prev[curr.name] = [];
            }
            prev[curr.name].push(curr.error);
            return prev;
          },
          {}
        )
      ).map(([field, errors]) => {
        const errorItems: JSX.Element[] = [];
        errors.forEach((err, i) => {
          const listItem = <ListItem key={i}>{err}</ListItem>;
          errorItems.push(listItem);
        });
        const errorList = <OderedList key={field}>{errorItems.map(item => item)}</OderedList>;
        return <CommandNotFound key={Math.random()} fieldName={field} error={errorList} />;
      });
      props.printErrors(undefined,undefined,undefined,errorsMessages);
    }
    return isValid;
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
      <SubmitButton disabled={props.loading} type="button" onClick={submitFormHandler}>
        _submit_query();
      </SubmitButton>
    </FormContainer>
  );
};

export default QueryForm;
