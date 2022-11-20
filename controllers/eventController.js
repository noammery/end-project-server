
class eventController {
    async postEvent(req, res) {
        try {
            const { image, name, description, date } = req.body
            const event = new Event({ image, name, description, date })
            await event.save()
            return res.json({ message: "Event posted successfully" })
        } catch (e) {
            console.log("arror!!111!!!");
        }
    }
    async getEvents(req, res) {
        try {
            const events = await Event.find()
            res.json(events)
        } catch (e) {
            console.log(e);
        }
    }
    async postSocial(req, res) {
        try {
            const { image, name, description, link } = req.body
            const social = new Social({ image, name, description, link })
            await social.save()
            return res.json({ message: "social posted successfully" })
        } catch (e) {
            console.log(e);
        }
    }
    async getSocials(req, res) {
        try {
            const socials = await Social.find()
            res.json(socials)
        } catch (e) {
            console.log(e);
        }
    }
    async postContact(req, res) {
        try {
            const { image, name, description, phone, email } = req.body
            const contact = new Contact({ image, name, description, phone, email })
            await contact.save()
            return res.json({ message: "contact posted successfully" })
        } catch (e) {
            console.log(e);
        }
    }
    async getContacts(req, res) {
        try {
            const contacts = await Contact.find()
            res.json(contacts)
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = new eventController()