const getState = ({ getStore, getActions, setStore }) => {

	const baseUrl = "https://assets.breatheco.de/apis/fake/contact/"

	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			agendaSlug: [
				"joshi_secret_agenda_2023"
			],
			contacts: [
		
			]
		},
		actions: {

			getContacts: async () => {
				const store = getStore();
				const getContactsUrl = baseUrl+"/agenda/"+store.agendaSlug[0] // UPDATE
				
				try{
					const response = await fetch(getContactsUrl);
					if (!response.ok){
						console.log(response.ok)
					}else{
						const agendaData = await response.json();
						console.log("agendaData", agendaData)
						setStore({...store, contacts: agendaData });
					
					}
				}catch(error){
					console.log(error);
				}

			},

			addNewContact: async (contactData) => {
				const store = getStore();

				try{
					const response = await fetch(baseUrl, {
						method: "POST",
                    	body: JSON.stringify(contactData), 
                    	headers: {
                        	"Content-Type": "application/json"
                        }
					})
					if (!response.ok){
						console.log(response.ok)
					}else{
						const jsonData = await response.json();
						console.log("jsonData: ", jsonData)
						const newContactsArray = [...store.contacts, jsonData ]
						setStore({...store, contacts: newContactsArray});
					}

				}catch(error){
					console.log(error);
				}				
			},

			deleteContact: async (contactId) => {
				const store = getStore();
				const actions = getActions(); 
		
				console.log("Delting contact: ", contactId)
				const deleteContactUrl = baseUrl+contactId
				console.log("deleteContactUrl", deleteContactUrl)
				try {
					const response = await fetch(deleteContactUrl, {
						method: "DELETE",
					});
					if (!response.ok){
						console.log(response.ok);
					}else{
						actions.getContacts();
					}

				}catch(error){
					console.log(error);
				}

			},

			updateContact: async (contactData) => {
				const store = getStore();
				const actions = getActions(); 
		
				console.log("Updating contact: ", contactData.id)
				const updateContactUrl = baseUrl+contactData.id
				try {
					const response = await fetch(updateContactUrl, {
						method: "PUT",
						body: JSON.stringify(contactData), 
                    	headers: {
                        	"Content-Type": "application/json"
                        }
					});
					if (!response.ok){
						console.log(response.ok);
					}else{
						actions.getContacts();
					}

				}catch(error){
					console.log(error);
				}

			},

			getParticularContact: async (contactId) => {
				const store = getStore();
				const getParticularContactUrl = baseUrl+contactId
				
				try{
					const response = await fetch(getParticularContactUrl);
					if (!response.ok){
						console.log(response.ok)
					}else{
						const contactData = await response.json();
						console.log(contactData);
						return(contactData);
					}
				}catch(error){
					console.log(error);
				}
			},




			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;