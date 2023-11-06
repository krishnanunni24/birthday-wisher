import React, { forwardRef } from "react";
import Input from "../registerForm/input";
import { petNameRules, commonQuestionRules ,additionalQuestionRules} from "../../data/formRules";

const MoreDetailsForm = forwardRef(({ answerMore ,register}, ref) => {


  return (
    <>
      <div>
        <label id="petname" className="justify-center flex text-white text-base py-4 font-bold w-full ">
          What's your pet name for them?
        </label>
        <Input
          rules={petNameRules}
          type="text"
          name="petname"
          register={register}
          placeholder="xxxxxxxxxxxxx"
        />
        <label id="angry" className="justify-center flex text-white text-base py-4 font-bold w-full ">
          What makes them angry?
        </label>
        <Input
          rules={commonQuestionRules}
          type="text"
          name="angry"
          register={register}
          placeholder="xxxxxxxxxxxxx"
        />
        <label id="funniestThing" className="justify-center flex text-white text-base py-4 font-bold w-full ">
          What is the funniest thing they do?
        </label>
        <Input
          rules={commonQuestionRules}
          type="text"
          name="funniestThing"
          register={register}
          placeholder="xxxxxxxxxxxxx"
          />
      </div>
      <div ref={ref} className={`${answerMore ? "block" : "hidden"}`}>
        <label id="smile" className="justify-center flex text-white text-base py-4 font-bold w-full ">
          What makes them smile?
        </label>
        <Input
          rules={additionalQuestionRules}
          type="text"
          name="smile"
          register={register}
          placeholder="xxxxxxxxxxxxx"
          />
        <label id="movie" className="justify-center flex text-white text-base py-4 font-bold w-full ">
          What is their favourite movie?
        </label>
        <Input
          rules={additionalQuestionRules}
          type="text"
          name="movie"
          register={register}
          placeholder="xxxxxxxxxxxxx"
          />
        <label htmlFor="favSport" className="justify-center flex text-white text-base py-4 font-bold w-full ">
          Their favourite sport?
        </label>
        <Input
          rules={additionalQuestionRules}
          type="text"
          name="favSport"
          register={register}
          placeholder="xxxxxxxxxxxxx"
        />
      </div>
          </>
  );
});

export default MoreDetailsForm;
