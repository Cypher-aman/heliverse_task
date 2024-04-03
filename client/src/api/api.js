const BASE_URL = import.meta.env.VITE_BASE_API_URL;
console.log(BASE_URL);

// ********************** USER APIs ******************************
export const fetchUser = async (props) => {
  const { search = '', page = 1, gender = [], domain = [], available } = props;

  const response = await fetch(
    `${BASE_URL}/user/?${search ? `search=${search}&` : ''}${
      gender.length !== 0 ? `gender=${gender.join(',')}&` : ''
    }${
      domain.length !== 0 ? `domain=${domain.join(',')}&` : ''
    }page=${page}&available=${available}`
  );
  const data = await response.json();
  if (!response.ok) {
    // If the response status is not in the 200-299 range, throw an error
    throw Error(data.message || 'Something went wrong');
  }
  return data;
};

// ********************** TEAM APIs ******************************

export const createTeam = async (name) => {
  const response = await fetch(`${BASE_URL}/team`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  if (!response.ok) {
    // If the response status is not in the 200-299 range, throw an error
    throw Error(data.message || 'Something went wrong');
  }
  return data;
};

export const fetchFilteredTeams = async (userId) => {
  const response = await fetch(`${BASE_URL}/team/user/${userId}`);
  const data = await response.json();
  if (!response.ok) {
    // If the response status is not in the 200-299 range, throw an error
    throw Error(data.message || 'Something went wrong');
  }
  return data;
};

export const addUserToTeam = async (props) => {
  const { userId, teamId } = props;
  const response = await fetch(
    `${BASE_URL}/team/user/${userId}?teams=${teamId}`,
    {
      method: 'PUT',
    }
  );
  const data = await response.json();
  if (!response.ok) {
    // If the response status is not in the 200-299 range, throw an error
    throw Error(data.message || 'Something went wrong');
  }
  return data;
};

export const fetchTeams = async () => {
  const response = await fetch(`${BASE_URL}/team`, {
    method: 'GET',
  });
  const data = await response.json();
  if (!response.ok) {
    // If the response status is not in the 200-299 range, throw an error
    throw Error(data.message || 'Something went wrong');
  }
  return data;
};

export const fetchTeamById = async (teamId) => {
  const response = await fetch(`${BASE_URL}/team/${teamId}`);
  const data = await response.json();
  if (!response.ok) {
    // If the response status is not in the 200-299 range, throw an error
    throw Error(data.message || 'Something went wrong');
  }
  return data;
};

export const deleteUserFormTeam = async (props) => {
  const { userId, teamId } = props;
  const response = await fetch(
    `${BASE_URL}/team/user/${userId}?teamId=${teamId}`,
    {
      method: 'DELETE',
    }
  );
  const data = await response.json();
  if (!response.ok) {
    // If the response status is not in the 200-299 range, throw an error
    throw Error(data.message || 'Something went wrong');
  }
  return data;
};

export const deleteTeamById = async (teamId) => {
  const response = await fetch(`${BASE_URL}/team/${teamId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!response.ok) {
    // If the response status is not in the 200-299 range, throw an error
    throw Error(data.message || 'Something went wrong');
  }
  return data;
};
