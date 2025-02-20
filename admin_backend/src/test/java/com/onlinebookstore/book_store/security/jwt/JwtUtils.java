package com.onlinebookstore.book_store.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt_secret_key}")
    private String jwtSecretKey;

    @Value("${jwt_expiration}")
    private int jwtExpiration;

    public String generateJwtToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Map<String,Object> claims = new HashMap<>();
        claims.put("username", userDetails.getUsername());
        claims.put("issuedAt",new Date());
        claims.put("expiration", new Date(new Date().getTime() + jwtExpiration));

        return Jwts.builder()
                .claims(claims)
                .signWith(key())
                .compact();
    }

    public SecretKey key(){
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes());
    }


    public boolean validateJwtToken(String authToken){
        try{
            Jwts.parser().verifyWith(key()).build().parse(authToken);
            return true;
        }catch(MalformedJwtException e){
            logger.error("Invalid JWT token");
        }catch (ExpiredJwtException e){
            logger.error("Expired JWT token");
        }catch(UnsupportedJwtException e){
            logger.error("Unsupported JWT token");
        }catch(IllegalArgumentException e){
            logger.error("JWT claims string is empty");
        }
        return false;
    }

    public String getUsernameFromJwtToken(String authToken){
        return Jwts.parser().verifyWith(key()).build().parseSignedClaims(authToken).getPayload().getSubject();
    }

}
