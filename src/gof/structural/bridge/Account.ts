import crypto from "crypto";

export default class Account {
    password: string = "";

    constructor(readonly name: string, readonly email: string, readonly document: string, 
        password: string, readonly passwordType: string
    ) {
        if (!name.match(/.+ .+/g)) throw new Error("Invalid name!");
        if (!email.match(/.+\@.+\..+/g)) throw new Error("Invalid email!");
        if (document.length !== 11) throw new Error("Invalid document!");
        if (passwordType === "plaintext") {
            this.password = password;
        }

        if (passwordType === "sha1") {
            this.password = crypto.createHash("sha1").update(password).digest("hex");
        }
    }

    passwordMathes(password: string) {
        if (this.passwordType === "plaintext") {
            return this.password === password;
        }

        if (this.passwordType === "sha1") {
            return this.password === crypto.createHash("sha1").update(password).digest("hex");
        }
    }

}