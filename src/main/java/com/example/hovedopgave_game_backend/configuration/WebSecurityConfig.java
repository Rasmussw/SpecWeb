package com.example.hovedopgave_game_backend.configuration;

import com.example.hovedopgave_game_backend.services.SpectatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
//Code from https://github.com/rickors560/spring-security-keycloak-exmaple/blob/main/keycloak-security/src/main/java/com/rick/keycloaksecurity/WebSecurityConfig.java

@Configuration
//Activates web security
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    //SecurityFilterChain - a method that configures security filters and access for http
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
            .authorizeHttpRequests(registry -> registry
                .requestMatchers("/spectator/**").hasRole("user")
                .requestMatchers("/organizer/**").hasRole("organizer")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2Configurer -> oauth2Configurer.jwt(jwtConfigurer -> jwtConfigurer.jwtAuthenticationConverter(jwt -> {
                //jwt = jason web token - getclaim - claims the key value
                Map<String, Collection<String>> realmAccess = jwt.getClaim("realm_access");
                //the roles a token contain
                Collection<String> roles = realmAccess.get("roles");

                //list of roles with ROLE_ as prefix
                List<SimpleGrantedAuthority> grantedAuthorities = roles.stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                    .toList();

                //id to be saved in the DB
                //String id = jwt.getClaim("sid");
                //System.out.println("ID from token " + id);

                String token = jwt.getTokenValue();
                System.out.println("access token " + token);

                String subID = jwt.getClaim("sub");
                System.out.println("Specific user id " + subID);

                return new JwtAuthenticationToken(jwt, grantedAuthorities);
            })));
        httpSecurity.cors();
        //returns the SecurityFilterChain
        return httpSecurity.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200", "http://localhost:8080"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization","content-type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}


