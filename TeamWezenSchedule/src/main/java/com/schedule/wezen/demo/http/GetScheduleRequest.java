package com.schedule.wezen.demo.http;

public class GetScheduleRequest {
	public final String requestSchedID;
	public final String requestWeekStart;
	
	public GetScheduleRequest (String requestSchedID, String requestStartDateOfWeek) {
		this.requestSchedID = requestSchedID;
		this.requestWeekStart = requestStartDateOfWeek;
	}
}