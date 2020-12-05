package seg3102.whmsapi.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import seg3102.whmsapi.controller.payload.AuthResponse
import seg3102.whmsapi.controller.payload.LoginData
import seg3102.whmsapi.controller.payload.MessageResponse
import seg3102.whmsapi.controller.payload.RegisterData
import seg3102.whmsapi.repository.UserRepository
import seg3102.whmsapi.security.UserDetailsImpl
import seg3102.whmsapi.security.credentials.ERole
import seg3102.whmsapi.security.credentials.User
import seg3102.whmsapi.security.jwt.JwtUtils
import javax.validation.Valid

@RestController
@CrossOrigin(origins = ["http://localhost:4200"])
@RequestMapping("/auth")
class AuthenticationController(val authenticationManager: AuthenticationManager,
                               val userRepository: UserRepository,
                               val encoder: PasswordEncoder,
                               val jwtUtils: JwtUtils) {
    @PostMapping("/login")
    fun loginUser(@RequestBody loginRequest: @Valid LoginData): ResponseEntity<*> {
        val authentication: Authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password))
        SecurityContextHolder.getContext().authentication = authentication
        val jwt = jwtUtils.generateJwtToken(authentication)
        val userDetails = authentication.principal as UserDetailsImpl
        val role = userDetails.authorities.elementAtOrNull(0)
        return ResponseEntity.ok<Any>(AuthResponse(jwt, userDetails.id, userDetails.username, role!!.authority))
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody registerRequest: @Valid RegisterData): ResponseEntity<*> {
        if(userRepository.existsByUsername(registerRequest.username)){
            return ResponseEntity.badRequest().body<Any>(MessageResponse("Error: Username is already taken"))
        }
        val user = User(registerRequest.username, encoder.encode(registerRequest.password))
        user.role = if ("admin" == registerRequest.role) ERole.ROLE_ADMIN
        else if("nurse" == registerRequest.role) ERole.ROLE_NURSE
        else if("doctor" == registerRequest.role) ERole.ROLE_DOCTOR
        else if("medical_doctor" == registerRequest.role) ERole.ROLE_MD
        else if("personnel_officer" == registerRequest.role) ERole.ROLE_PO
        else ERole.ROLE_USER
        userRepository.save(user)
        return ResponseEntity.ok<Any>(MessageResponse("User registered successfully!"))
    }

    @GetMapping("/getDoctors")
    fun getUser(): ResponseEntity<*>{
        val users = userRepository.findUserByRole(ERole.ROLE_DOCTOR)
        return ResponseEntity(users, HttpStatus.OK)
    }
}