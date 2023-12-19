const login = async () => {
  const login_url = " https://login.salesforce.com/services/oauth2/token";
  const login_form = {
    grant_type: "password",
    client_id:
      "3MVG9I9urWjeUW051PumYX1mbS5HkS3kpZsbCEzYWjgivRyDno1MjvM08EfVf2be52s0vrthHamsgMpQCrm5Z",
    client_secret:
      "EC97DAFBF9F6F2399DE5E7BADA2E9BBEF6B3B6E832DC435668AA452940AD9501",
    username: "soljit_algeria2@soljit.com",
    password: "entretient_1235zoLmTaUDLiouUaOAN6WhOQPi",
  };

  const response = await fetch(login_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(login_form),
  });

  if (!response.ok) {
    throw new Error("Authentication error");
  }

  const data = await response.json();
  const { access_token, instance_url } = data;
  return { access_token, instance_url };
};

const getApplication = async () => {
  console.log("Exercice 1");

  const id = "a004L000002gCJK";
  const { access_token, instance_url } = await login();
  const url = `${instance_url}/services/data/v55.0/sobjects/Candidature__c/${id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error("Error fetching application");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
};

const addApplication = async () => {
  console.log("Exercice 2");

  const { access_token, instance_url } = await login();

  const url = `${instance_url}/services/data/v55.0/sobjects/Candidature__c`;
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      First_Name__c: "Kadiri",
      Last_Name__c: "Mehdi",
      Year_Of_Experience__c: "3",
    }),
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error("Error adding application");
    }

    const data = await response.json();
    if (data.success) {
      console.log("Application added Successfully");
      console.log("The new application id is:", data.id);
    }
  } catch (error) {
    console.error(error.message);
  }
};

// Modify the other functions similarly
const modifyApplication = async (lastName) => {
  console.log("Exercice 3");

  const { access_token, instance_url } = await login();
  const id = "a004L000002gCJK";
  const url = `${instance_url}/services/data/v55.0/sobjects/Candidature__c/${id}`;
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };
  const body = {
    Last_Name__c: lastName,
  };

  try {
    const response = await fetch(url, {
      ...config,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Error modifying application");
    }

    console.log("Modified successfully!");
  } catch (error) {
    console.error(error.message);
  }
};

const getAllApplications = async () => {
  console.log("Exercice 4");

  const { access_token, instance_url } = await login();
  const url = `${instance_url}/services/data/v55.0/sobjects/Candidature__c`;

  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error("Error fetching applications");
    }

    const data = await response.json();
    console.log("All applications:");
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
};

const searchApplications = async (searchParam, searchTerm) => {
  console.log("Exercice 5");
  const { access_token, instance_url } = await login();
  const url = `${instance_url}/services/data/v55.0/query/?q=SELECT+*+FROM+Candidature__c+WHERE+${searchParam}='${searchTerm}'`;
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error("Error searching applications");
    }

    console.log(response.status);
  } catch (error) {
    console.error(error.message);
  }
};

getApplication();
// addApplication();
// modifyApplication("Kadiri");
// getAllApplications();
// searchApplications("Last_Name__c", "Kadiri");
