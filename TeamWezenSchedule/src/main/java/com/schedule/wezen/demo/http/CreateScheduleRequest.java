// Team Wezen

package com.schedule.wezen.demo.http;

public class CreateScheduleRequest {
	public String startDate;
	public String endDate;
	public String startTime;
	public String endTime;
	public String slotDuration;
	
	public CreateScheduleRequest(String startDate, String endDate, String startTime, String endTime, String slotDuration) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.startTime = startTime;
		this.endTime = endTime;
		this.slotDuration = slotDuration;
	}
	
	public String toString() {
		return "CreateSchedule( Start Date: " + startDate + ", End Date : " + endDate + ", Start Time : " + startTime + ", End Time : " + endTime + ", Slot Duration : " + slotDuration + " )";
	}
}