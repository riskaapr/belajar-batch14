import fetch from "node-fetch"
import { expect } from "chai";
import Ajv from "ajv";
import schema_showuser from "../schema/reqresSchema.js";
import schema_loginuser from "../schema/loginSchema.js";

describe("API Test User", function(){
    let globalToken;

    it("User Login - POST", async function(){
        const newPost = {
            username: "admin",
            password: "admin"
        }

        const hasilpost = await fetch('https://belajar-bareng.onrender.com/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                //"x-api-key": "reqres_73cf8090ed9d410ab8e0ad831e50df00"
            },
            body: JSON.stringify(newPost)
        })
        const data = await hasilpost.json();
        globalToken = data.token;
        //console.log("Token didapat: " + globalToken);
        //Validasi
        expect(hasilpost.status).to.equal(200);
        expect(hasilpost.statusText).to.equal("OK");
        expect(data.status).to.equal(200);
        expect(data.message).to.equal("Login successful");

        // validasi json schema
        const ajvLogin = new Ajv()
        const cekLogin = ajvLogin.compile(schema_loginuser)
        const hasil_schema_login = cekLogin(data)

        expect(hasil_schema_login).to.be.true;

    });

    it("Show user - GET", async function(){
        const hasil = await fetch('https://belajar-bareng.onrender.com/api/users/', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization":  `Bearer ${globalToken}`
            }
        });
        const responseData = await hasil.json();
        //console.log("responseData didapat: " + responseData.users[0].username);
        //validasi
        expect(hasil.status).to.equal(200);
        expect(responseData.status).to.equal(200);
        expect(responseData.users[0].username).to.equal("Ridhwan");
        expect(responseData.users[0].age).to.equal(29);      
        
        // validasi json schema
        const ajv = new Ajv()
        const cekcek = ajv.compile(schema_showuser)
        const hasil_schema = cekcek(responseData)

        expect(hasil_schema).to.be.true;
    });

})