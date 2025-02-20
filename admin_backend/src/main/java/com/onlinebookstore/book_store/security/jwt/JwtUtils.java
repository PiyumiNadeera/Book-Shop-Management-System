package com.onlinebookstore.book_store.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;


@SuppressWarnings("deprecation")
@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt_secret_key}")
    private String jwtSecretKey;

    @Value("${jwt_expiration}")
    private int jwtExpiration;


    public String generateJwtToken(Authentication authentication){
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal(); //Get the returned user details from the object

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+jwtExpiration))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }


    public Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecretKey));
    }


    public boolean validateJwtToken(String authToken){
        try{
            Jwts.parser().setSigningKey(key()).build().parseClaimsJws(authToken);
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
        return Jwts.parser().setSigningKey(key()).build().parseClaimsJws(authToken).getBody().getSubject();
    }

}
