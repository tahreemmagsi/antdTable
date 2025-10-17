export async function fetchUsers() {

  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  const extended = data.map((user: any) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    company: user.company.name,
    address: user.address.city,
    zipcode: user.address.zipcode,
    suite: user.address.suite,
  }));
  localStorage.setItem("usersData", JSON.stringify(extended));
  return extended;
}

export function updateUser(updated: any) {
  const stored = localStorage.getItem("usersData");
  if (!stored) return;
  const users = JSON.parse(stored);
  const newData = users.map((u: any) =>
    u.id === updated.id ? updated : u
  );
  localStorage.setItem("usersData", JSON.stringify(newData));
}
