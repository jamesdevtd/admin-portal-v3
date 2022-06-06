import { yupResolver } from "@hookform/resolvers/yup";
import moment from 'moment';
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import DatePicker from 'react-datepicker';
import { Controller, FormProvider, useForm } from "react-hook-form";
import { MdOutlineContactMail } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";
import * as yup from 'yup';

import "react-datepicker/dist/react-datepicker.css";
import styles from "./HqSettings.module.scss";
import formStyles from '@/components/forms/styles/FormGroup.module.scss';

import SubmitButton from "@/components/buttons/SubmitButton";
import ContentWrap from "@/components/layout/ContentWrap";
import Layout from "@/components/layout/Layout";
import ButtonLink from "@/components/links/ButtonLink";

import { blankUserDetails } from "@/static/userDetails";
import { objectStringsToDates } from "@/utils/objectUtils";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    role: yup.string().required(),
    createdBy: yup.string().required(),
    createdDate: yup.string().required(),
  })
  .required();
export default function HqSettings() {
  const [hasErrors, setHasErrors] = useState(false);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const hqSettingsRef = useRef<any>();
  const today = moment().toDate();

  const eventDateElements = {
    createdDate: null,
  };

  const stringsToDates = { ...objectStringsToDates(eventDateElements) };
  const formDefaultValues = { ...blankUserDetails, ...stringsToDates };


  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: formDefaultValues,
  });
  const {
    handleSubmit,
    register,
    clearErrors,
    setValue,
    control,
    formState,
  } = methods;

  const onSubmit = (data: unknown) => {
    //TODO: send Redux state affiliateDetails to API through redux middleware
    // console.log('POST: sending data...');
    // eslint-disable-next-line no-console
    console.log('POST: sending data...', data);
  };
  useImperativeHandle(hqSettingsRef, () => ({ submitForm }));
  const submitForm = () => {
    handleSubmit(onSubmit, () => {
      // eslint-disable-next-line no-console
      console.log('Submit Failed - has Form Errors', formState.errors);
    })();
  };

  const submitEventsForm = () => {
    if (hqSettingsRef && hqSettingsRef.current) {
      hqSettingsRef.current.submitForm();
    }
  };
  useEffect(() => {
    Object.keys(formState.errors).length
      ? setHasErrors(true)
      : setHasErrors(false);
    if (formState.isDirty) setIsFormEdited(true);
  }, [formState.errors, formState.isDirty]);

  return (
    <Layout>
      <ContentWrap className={styles.HqSettings}>
        <header className='content-header'>
          <MdOutlineContactMail />
          <h2>HQ Settings</h2>
          <span className='ml-auto flex items-center'>
            <RiArrowGoBackLine />
            Back to previous screen
          </span>
        </header>

        <div className='content-main'>
          <div className='inner-content'>
            <FormProvider {...methods}>
              <form ref={hqSettingsRef} onSubmit={handleSubmit(onSubmit)} className={`main-form  ${hasErrors ? 'has-errors' : ''}`}>
                <div className={`${formStyles.formGroup}`}>
                  <div className='fields-group'>
                    <div className='col'>
                      <input type='text' {...register('firstName')} onChange={() => clearErrors('firstName')} />
                      {formState.errors.firstName ?
                        (<span className='error'>First Name is required</span>) :
                        (<label>First Name</label>)
                      }
                    </div>
                    <div className='col'>
                      <input type='text' {...register('lastName')} onChange={() => clearErrors('lastName')} />
                      {formState.errors.lastName ?
                        (<span className='error'>Last Name is required</span>) :
                        (<label>Last Name</label>)
                      }
                    </div>
                    <div className='col'>
                      <input type='text' {...register('email')} onChange={() => clearErrors('email')} />
                      {formState.errors.email ?
                        (<span className='error'>Email is required</span>) :
                        (<label>Email</label>)
                      }
                    </div>
                  </div>
                  <div className="fields-group">
                    <div className='col'>
                      <input type='text' {...register('phone')} onChange={() => clearErrors('phone')} />
                      {formState.errors.phone ?
                        (<span className='error'>Mobile Phone is required</span>) :
                        (<label>Mobile Phone</label>)
                      }
                    </div>
                  </div>
                  <div className="fields-group">
                    <div className='col full-width'>
                      <select {...register('role')} onChange={() => clearErrors('role')}>
                        <option value="hq">HQ</option>
                        <option value="admin">Admin</option>
                        <option value="affiliate">Affiliate</option>
                      </select>
                      {formState.errors.role ?
                        (<span className='error'>Role is required</span>) :
                        (<label>Role</label>)
                      }
                    </div>
                  </div>
                  <div className="fields-group">
                    <div className='col'>
                      <Controller
                        name='createdDate'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <DatePicker
                            selected={field?.value ? moment(field?.value).toDate() : null}
                            maxDate={today}
                            onChange={(e) => field.onChange(e)}
                            onCalendarClose={() => {
                              if (field.value) {
                                setValue('createdDate', field.value);
                              }
                            }}
                            className='datepicker-group'
                            placeholderText=''
                            dateFormat='MMMM d, yyyy' />
                        )}
                      />
                      {formState.errors.createdDate ? (
                        <span className='error'>Created Date is required</span>
                      ) : (
                        <label>Created Date</label>
                      )}
                    </div>
                    <div className='col'>
                      <input type='text' {...register('createdBy')} onChange={() => clearErrors('createdBy')} />
                      {formState.errors.createdBy ?
                        (<span className='error'>Created By is required</span>) :
                        (<label>Created By</label>)
                      }
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </ContentWrap>

      <div className={`${styles.footerNav} ${isFormEdited ? '' : 'hidden'}`}>
        <div className='wrap'>
          <ButtonLink variant='grey' href='/dashboard'>
            Cancel
          </ButtonLink>
          <SubmitButton
            formId='hqSettings'
            clickHander={submitEventsForm}
          >
            Save
          </SubmitButton>
        </div>
      </div>
    </Layout>
  );

}