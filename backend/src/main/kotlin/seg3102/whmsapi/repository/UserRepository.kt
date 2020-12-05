package seg3102.whmsapi.repository

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import seg3102.whmsapi.security.credentials.ERole
import seg3102.whmsapi.security.credentials.User
import java.util.*

interface UserRepository: CrudRepository<User, Long> {
    fun findByUsername(username: String): Optional<User>

    fun existsByUsername(username: String): Boolean

    @Query(value="select us from User us where us.role = :userRole")
    fun findUserByRole(userRole: ERole): List<User>
}