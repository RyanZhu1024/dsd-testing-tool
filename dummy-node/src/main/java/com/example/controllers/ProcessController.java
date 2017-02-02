package com.example.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.lang.management.ManagementFactory;

/**
 * Created by RyanZhu on 31/01/2017.
 */
@RestController
public class ProcessController {
    @RequestMapping(path = "api/pid", method = RequestMethod.GET)
    public String getPid() {
        return ManagementFactory.getRuntimeMXBean().getName().split("@")[0];
    }
}
