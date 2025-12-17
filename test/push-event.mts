import { hatchet } from "../clients.js"

await hatchet.event.push("github:star:created", {
    action: "created",
    sender: {
        login: "test-user",
        email: "test@example.com",
        html_url: "https://github.com/test-user"
    },
    repository: {
        name: "test-repo",
        html_url: "https://github.com/org/test-repo"
    }
})

console.log("✅ Event pushed!")

