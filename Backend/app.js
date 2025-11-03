import express from "express";
import fs from "fs";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express API!');
})

.get('/user/users', getUsers)
.get('/user/users/:userId', getSingleUser)
.get('/user/userSearch/:searchText', getUserSearch)
.post('/user/addUser', addNewUser)
.put('/user/editUser', editNewUser)
.delete('/user/deleteUser/:userId', deleteNewUser)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


function getUsers(req, res){
    fs.readFile("users.json", {encoding: "utf-8"}, (err, results) => {
        let userList = JSON.parse(results)
        res.send(userList);
    })
}

function getSingleUser(req, res){
    fs.readFile("users.json", {encoding: "utf-8"}, (err, results) => {
        let userId = +req.params.userId;
        let userList = JSON.parse(results)
        let singleUser = userList.filter(row => {
            return row.userId === userId;
        })[0]
        res.send(singleUser);
    })
}



    function getUserSearch(req, res){
        fs.readFile("users.json", {encoding: "utf-8"}, (err, results) => {
            let searchText = req.params.searchText.toLowerCase();
            let userList = JSON.parse(results)
            let searchedUsers = userList.filter(row => {
                return row.fullName.toLowerCase().includes(searchText)
            })
            res.send(searchedUsers);
        })
    }

    function addNewUser(req, res){
        fs.readFile("users.json", {encoding: "utf-8"}, (err, results) => {

            let userList = JSON.parse(results);

            let newUser = req.body;
            
            let usernameIsUnique = userList.filter(row => {
                return row.username === newUser.username;
            }).length === 0;
            //set userID increment

            if(usernameIsUnique){

                userList.sort((a, b) =>{
                    return a.userId > b.userId ? 1 : -1
                })
    
                let latestUserId = userList[userList.length - 1].userId
    
                newUser.userId = latestUserId + 1
    
                userList.push(newUser);
    
                writeToFile("users.json", JSON.stringify(userList)).then(didWriteToFile =>{
                    if(didWriteToFile){
    
                        res.send({"message" : "Request worked"}); 
                    } else{
                        res.send({"message" : "Request failed to save"});
                    }
                })
            } else {res.send({"message": "User lowkey exist gang"})}

        })
    }



    function editNewUser(req, res){
        fs.readFile("users.json", {encoding: "utf-8"}, (err, results) => {

            let userList = JSON.parse(results);

            let userForEdit = req.body;

            let userId = userForEdit.userId;

            let usernameIsUnique = userList.filter(row => {
                return row.username === userForEdit.username && row.userId !== userId;
            }).length === 0;

            if(usernameIsUnique){
                
                let userListEdited = userList.filter((row) => {
                    return row.userId !== userId;
                })
      
                userListEdited.push(userForEdit);
    
                //sort before we save
                userListEdited.sort((a, b) =>{
                    return a.userId > b.userId ? 1 : -1
                });
    
    
                writeToFile("users.json", JSON.stringify(userListEdited)).then(didWriteToFile =>{
                    if(didWriteToFile){
    
                        res.send({"message" : "Request worked"}); 
                    } else{
                        res.send({"message" : "Request failed to save"});
                    }
                })
            } else {res.send({"message": "User lowkey exist gang"})}

        })
            
    }

    function deleteNewUser(req, res){
        fs.readFile("users.json", {encoding: "utf-8"}, (err, results) => {

            let userList = JSON.parse(results);

            let userId = +req.params.userId;

            let userListAfterDelete = userList.filter((row) => {
                return row.userId !== userId;
            })

            writeToFile("users.json", JSON.stringify(userListAfterDelete)).then(didWriteToFile =>{
                if(didWriteToFile){

                    res.send({"message" : "Request worked"}); 
                } else{
                    res.send({"message" : "Request failed to save"});
                }
            })

        })
    }

    function writeToFile(fileName, fileText){
        return new Promise((resolve) => {

            fs.writeFile(fileName, fileText, (err) => {
                if(err){console.log(err);
                resolve(false);}
                else {resolve(true)}
            })
        })
    }