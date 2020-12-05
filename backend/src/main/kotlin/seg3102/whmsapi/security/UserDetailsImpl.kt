package seg3102.whmsapi.security

import net.minidev.json.annotate.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import seg3102.whmsapi.security.credentials.User

class UserDetailsImpl(val id: Long, private val username: String,
                      val firstname: String, val lastname: String,
                      @field: JsonIgnore private val password: String,
                      private val authorities: Collection<GrantedAuthority>) : UserDetails {
    override fun getAuthorities(): Collection<GrantedAuthority> {
        return authorities
    }

    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String {
        return username
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}

fun build(user: User): UserDetailsImpl {
    val authorities = ArrayList<GrantedAuthority>()
    authorities.add(SimpleGrantedAuthority(user.role.name))
    return UserDetailsImpl(
            user.id,
            user.username,
            user.firstname,
            user.lastname,
            user.password,
            authorities
    )
}