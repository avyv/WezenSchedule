package com.schedule.wezen.demo.http;

public class ExtendStartEndRequest {
	public final String requestSchedID;
	public final String requestNewStart;
	public final String requestNewEnd;
	
	public ExtendStartEndRequest (String id, String ns, String ne){
		this.requestSchedID = id;
		this.requestNewStart = ns;
		this.requestNewEnd = ne;
	}
	
	public String toString() {
		return "ExtendStartEndRequest( schedule: " + requestSchedID + ", new start date: " + requestNewStart + ", new end date: " + requestNewEnd + ")";
	}
}