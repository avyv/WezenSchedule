package com.schedule.wezen.demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.Scanner;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.google.gson.Gson;

import com.schedule.wezen.demo.http.CreateScheduleRequest;
import com.schedule.wezen.demo.http.CreateScheduleResponse;
import com.schedule.wezen.db.SchedulesDAO;
import com.schedule.wezen.model.Schedule;
import com.schedule.wezen.model.Model;

import java.time.LocalTime;
import java.time.LocalDate;



public class CreateScheduleHandler implements RequestStreamHandler {
	
	public LambdaLogger logger = null;
	
	
	/**
	 * Load from RDS, if it exists
	 * 
	 * @throws Exception
	 */
	boolean createScheduleLambda(String startDate, String endDate, String startTime, String endTime, String slotDuration, String id) throws Exception {
		if(logger != null) { logger.log("in createSchedule");}
		
		/* turn the times and dates into appropriate objects */
		Model m = new Model();
		
		logger.log("after model, before LocalDate");
		
		LocalDate startD = m.stringToDate(startDate);
		
		logger.log("Date: " + startDate + "");
		
		LocalDate endD = m.stringToDate(endDate);
		
		LocalTime startT = m.stringToTime(startTime);
		LocalTime endT = m.stringToTime(endTime);
		
		int slotD = Integer.parseInt(slotDuration);
		
		int secretCode = m.createSecretCode();
		
		logger.log("SecretCode: " + secretCode + "");
		

		SchedulesDAO dao = new SchedulesDAO();
		
		Schedule schedule = new Schedule(startD, endD, startT, endT, slotD, id, secretCode);
		
		return dao.updateSchedule(schedule);
	}

    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {

    	logger = context.getLogger();
		logger.log("Loading Java Lambda handler to create Schedule");

		JSONObject headerJson = new JSONObject();
		headerJson.put("Content-Type",  "application/json");  // not sure if needed anymore?
		headerJson.put("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
	    headerJson.put("Access-Control-Allow-Origin",  "*");
	        
		JSONObject createScheduleResponseJson = new JSONObject();
		createScheduleResponseJson.put("headers", headerJson);
		
		// This is where the response will be stored
		CreateScheduleResponse cSchedResponse = null;
		
		// extract body from incoming HTTP POST request. If any error, then return 422 error
		String body;
		boolean processed = false;
		try {
			BufferedReader reader = new BufferedReader(new InputStreamReader(input));
			JSONParser parser = new JSONParser();
			JSONObject event = (JSONObject) parser.parse(reader);
			logger.log("event:" + event.toJSONString());
			
			String method = (String) event.get("httpMethod");
			logger.log("method: " + method);
			if (method != null && method.equalsIgnoreCase("OPTIONS")) {
				logger.log("Options request");
				
				
				cSchedResponse = new CreateScheduleResponse("Success: Schedule created!!!", 200);  // OPTIONS needs a 200 response
		        createScheduleResponseJson.put("body", new Gson().toJson(cSchedResponse));
		        
		        processed = true;
		        body = null;
			} else {
				logger.log("in-branch");
				body = (String)event.get("body");
				logger.log("pre-body:" + body);
				
				if (body == null) {
					body = event.toJSONString();  // this is only here to make testing easier
				}
				logger.log("body:" + body);
			}
		} catch (ParseException pe) {
			
			logger.log("exception: " + pe.toString());
			
			cSchedResponse = new CreateScheduleResponse("Bad Request:" + pe.getMessage(), 422);  // unable to process input
	        createScheduleResponseJson.put("body", new Gson().toJson(cSchedResponse));
	        processed = true;
	        body = null;
		}
		
		logger.log("processed" + processed);

		if (!processed) {
			CreateScheduleRequest req = new Gson().fromJson(body, CreateScheduleRequest.class);
			logger.log("request: " + req.toString());

			//CreateScheduleResponse resp;
			
			CreateScheduleResponse resp = null; //
			
			
			SchedulesDAO dao = new SchedulesDAO();
			
			Schedule retrievedSchedule = null;
			
			boolean didRetrieveSchedule = false; //
			
			
		
			
			
			
			
			try {
				/* NOTE: When the database is created, we will use these lines to create Schedules */
				
				// DATABASE STUFF!!!
				
				if (createScheduleLambda(req.startDate, req.endDate, req.startTime, req.endTime, req.slotDuration, req.id)) {
					
					
					try { //
						retrievedSchedule = dao.getSchedule(req.id);
						didRetrieveSchedule = true;
					} catch (Exception e) {
						resp = new CreateScheduleResponse("Unable to retrieve schedule: (" + e.getMessage() + ")", 403);
					} //
					
					
					if(didRetrieveSchedule) {
						resp = new CreateScheduleResponse("Successfully created schedule", req.startDate, req.endDate, req.startTime, retrievedSchedule.getSlotDuration(), retrievedSchedule.getNumSlotsDay(), retrievedSchedule.getSecretCode(), retrievedSchedule.getTimeSlots(), 200);
					}
					
					
					
					//resp = new CreateScheduleResponse("Successfully created schedule", req.startDate, req.endDate, req.startTime, req.slotDuration, retrievedSchedule.getNumSlotsDay(), retrievedSchedule.getSecretCode(), retrievedSchedule.getTimeSlots(), 200);
					
					
					
				} else {
					resp = new CreateScheduleResponse("Unable to create schedule: ", 422);
				}
			} catch (Exception e) {
				resp = new CreateScheduleResponse("Unable to create schedule: (" + e.getMessage() + ")", 403);
			}

			// compute proper response
	        createScheduleResponseJson.put("body", new Gson().toJson(resp));
		}
		
        logger.log("end result:" + createScheduleResponseJson.toJSONString());
        logger.log(createScheduleResponseJson.toJSONString());
        OutputStreamWriter writer = new OutputStreamWriter(output, "UTF-8");
        writer.write(createScheduleResponseJson.toJSONString());  
        writer.close();
        logger.log("you did it, congrats");
    }

}
