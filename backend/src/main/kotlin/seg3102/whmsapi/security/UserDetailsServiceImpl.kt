package seg3102.whmsapi.security

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import seg3102.whmsapi.repository.UserRepository
import seg3102.whmsapi.security.credentials.User
import javax.transaction.Transactional

@Service
class UserDetailsServiceImpl(val userRepository: UserRepository): UserDetailsService {

    @Transactional
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user: User = userRepository.findByUsername(username)
                .orElseThrow { UsernameNotFoundException("User username: $username not found") }
        return build(user)
    }
}