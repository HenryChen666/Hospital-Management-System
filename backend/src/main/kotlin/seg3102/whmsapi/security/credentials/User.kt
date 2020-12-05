package seg3102.whmsapi.security.credentials

import javax.persistence.*
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size


@Entity
@Table(name = "users", uniqueConstraints = [UniqueConstraint(columnNames = ["username"])])
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0

    @NotBlank
    @Size(max = 20)
    var username: String = ""

    @NotBlank
    @Size(max = 20)
    var firstname: String = ""

    @NotBlank
    @Size(max = 20)
    var lastname: String = ""

    @NotBlank
    @Size(max = 120)
    var password: String = ""

    @Enumerated(EnumType.STRING)
    var role: ERole = ERole.ROLE_USER

    constructor(){}
    constructor(username: String, firstname: String, lastname: String, password: String){
        this.username = username
        this.firstname = firstname
        this.lastname = lastname
        this.password = password
    }
}