package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

import java.lang.management.ManagementFactory;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
        RestTemplate restTemplate = new RestTemplate();
        String pid = ManagementFactory.getRuntimeMXBean().getName().split("@")[0];
        restTemplate.exchange("http://localhost:4000/api/v1/node-info/?pid={pid}&port={port}", HttpMethod.GET, null, String.class, pid, 8080);
		SpringApplication.run(DemoApplication.class, args);
	}
}
