import admin from 'firebase-admin'
import service from './servicefile.json'

admin.initializeApp({
    projectId: service.project_id,
    credential: admin.credential.cert('./servicefile.json'),
    serviceAccountId: service.client_email
})

class Auth {
    auth = admin.auth()
    async getUser(email: string) {
        try {
            console.log('getUser all users', await this.auth.listUsers())
            const user = await this.auth.getUserByEmail(email)
            console.log('getUser', user)
            return user
        } catch (e) {
            return ''
        }
    }
    async createToken(uid: string) {
        const token = await this.auth.createCustomToken(uid)
        return token
    }
    async createUser(email) {
        console.log(email)
        const user = await this.auth.createUser({
            email: email,
            emailVerified: true,
            displayName: email,
            disabled: false
        })
        console.log('createUser', user.toJSON())
        return user
    }
}

export default new Auth()