import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const CareerProfile = () => {
  const { register, handleSubmit, errors } = useForm();
  const [qualifications, setQualifications] = useState([]);
  const [qualificationId, setQualificationId] = useState(null);
  const [workingWithLists, setWorkingWithLists] = useState([]);
  const [workingWithId, setWorkingWithId] = useState(null);
  const [workingAsLists, setWorkingAsLists] = useState([]);
  const [workingAsId, setWorkingAsId] = useState(null);
  const [incomeDurations, setIncomeDurations] = useState([]);
  const [incomeDurationId, setIncomeDurationId] = useState(null);
  const [incomeLists, setIncomeLists] = useState([]);
  const [incomeId, setIncomeId] = useState(null);

  const [token, setToken] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setToken(sessionStorage.getItem('Token'));
    fetch(
      'https://biyekorun-staging.techserve4u.com/category/qualification/qualification-list',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setQualifications(json.data));
    fetch(
      'https://biyekorun-staging.techserve4u.com/category/working/working-with-list',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setWorkingWithLists(json.data));

    fetch(
      'https://biyekorun-staging.techserve4u.com/category/working/working-as-list',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setWorkingAsLists(json.data));

    fetch(
      'https://biyekorun-staging.techserve4u.com/category/income/income-duration-type-list',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setIncomeDurations(json.data));
    fetch(
      'https://biyekorun-staging.techserve4u.com/category/income/income-type-list',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setIncomeLists(json.data));
  }, [token]);

  const onSubmit = (data) => {
    console.log(
      JSON.stringify({
        college_name: data.college_name,
        company_name: data.company_name,
        qualification_id: parseInt(data.qualification_id),
        working_with_id: parseInt(data.working_with_id),
        working_as_id: parseInt(data.working_as_id),
        income_duration_type_id: parseInt(data.income_duration_type_id),
        income_id: parseInt(data.income_id),
      })
    );
    fetch(
      'https://biyekorun-staging.techserve4u.com/user/update-profile-career',
      //https://biyekorun-staging.techserve4u.com/user/update-profile-career
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          college_name: data.college_name,
          company_name: data.company_name,
          qualification_id: parseInt(data.qualification_id),
          working_with_id: parseInt(data.working_with_id),
          working_as_id: parseInt(data.working_as_id),
          income_duration_type_id: parseInt(data.income_duration_type_id),
          income_id: parseInt(data.income_id),
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.statusCode === 201) {
          toast.success(json.message);
          history.push(`/createProfile/bioProfile`);
        } else if (json.statusCode === 403) {
          toast.error(json.message);
        } else if (json.statusCode === 404) {
          toast.error(json.message);
        } else if (json.statusCode === 500) {
          toast.error(json.message);
        } else if (json.statusCode === 400) {
          toast.error(json.error);
        }
      });
  };

  return (
    <div className="custom-form">
      <h3 className="text-center brand-text mb-5">
        Just a few question about your education and career
      </h3>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  College Name
                </label>
                <input
                  type="text"
                  ref={register({ required: true })}
                  className="form-control"
                  name="college_name"
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Company Name
                </label>
                <input
                  type="text"
                  ref={register({ required: true })}
                  className="form-control"
                  name="company_name"
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Qualification
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="qualification_id"
                  className="form-control"
                  value={qualificationId}
                  onChange={(e) => setQualificationId(e.target.value)}
                >
                  <option value="">-- please select the country --</option>
                  {qualifications?.length >= 1 ? (
                    qualifications.map((qualification) => (
                      <option key={qualification.id} value={qualification.id}>
                        {qualification.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Please reload the page again</option>
                  )}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Working with
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="working_with_id"
                  className="form-control"
                  value={workingWithId}
                  onChange={(e) => setWorkingWithId(e.target.value)}
                >
                  <option value="">-- please select the country --</option>
                  {workingWithLists?.length >= 1 ? (
                    workingWithLists.map((workingList) => (
                      <option key={workingList.id} value={workingList.id}>
                        {workingList.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Please reload the page again</option>
                  )}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Working As
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="working_as_id"
                  className="form-control"
                  value={workingAsId}
                  onChange={(e) => setWorkingAsId(e.target.value)}
                >
                  <option value="">-- please select the country --</option>
                  {workingAsLists?.length >= 1 ? (
                    workingAsLists.map((workingList) => (
                      <option key={workingList.id} value={workingList.id}>
                        {workingList.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Please reload the page again</option>
                  )}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Income Duration
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="income_duration_type_id"
                  className="form-control"
                  value={incomeDurationId}
                  onChange={(e) => setIncomeDurationId(e.target.value)}
                >
                  <option value="">-- please select the country --</option>
                  {incomeDurations?.length >= 1 ? (
                    incomeDurations.map((incomeDuration) => (
                      <option key={incomeDuration.id} value={incomeDuration.id}>
                        {incomeDuration.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Please reload the page again</option>
                  )}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div>
                <label className="brand-text" htmlFor="">
                  Income
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="income_id"
                  className="form-control"
                  value={incomeId}
                  onChange={(e) => setIncomeId(e.target.value)}
                >
                  <option value="">-- please select the country --</option>
                  {incomeLists?.length >= 1 ? (
                    incomeLists.map((income) => (
                      <option key={income.id} value={income.id}>
                        {income.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Please reload the page again</option>
                  )}
                </select>
              </div>
            </div>

            <div className="form-group row justify-content-center ">
              <div className="col-md-8"></div>
              <div className="col-md-4">
                <input
                  className="btn btn-grad ml-auto"
                  type="submit"
                  value="Next"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default CareerProfile;
