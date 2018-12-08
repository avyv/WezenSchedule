package com.schedule.wezen.model;

import static org.junit.Assert.*;

import java.time.LocalDate;
import java.time.LocalTime;

import org.junit.Test;

//TODO
import com.schedule.wezen.db.SchedulesDAO;
import com.schedule.wezen.db.TimeSlotsDAO;

import junit.framework.TestCase;

public class TimeSlotTests extends TestCase {
	TimeSlotsDAO dao;
	TimeSlot testSlot;
	
	@Override
	protected void setUp() throws Exception {
		dao = new TimeSlotsDAO();
		testSlot = createTimeSlot();
	}

	//TODO
	SchedulesDAO sched = new SchedulesDAO();
	Schedule s = new Schedule(LocalDate.parse("2018-12-13"), LocalDate.parse("2018-12-30"), LocalTime.parse("08:00:00"), LocalTime.parse("10:00:00"), 60, "anid", 1);
	
	@Test
	public void testDeleteThisTest() throws Exception {
		sched.addSchedule(s);
		
		sched.addSchedule(s);
		
		Schedule newS = sched.getSchedule("anid");
		
		sched.deleteSchedule(s);
	}
	
	//DAO
	@Test
	public void testAddGetDeleteTimeSlot() throws Exception{
		dao.addTimeSlot(testSlot);
		
		TimeSlot returnedSlot = dao.getTimeSlot(testSlot.startTime, testSlot.getDate());
		assertTrue(testSlot.id.equals(returnedSlot.id));
		assertTrue(testSlot.secretCode == returnedSlot.secretCode);
		assertTrue(testSlot.sid.equals(returnedSlot.sid));
		assertTrue(testSlot.hasMeeting == returnedSlot.hasMeeting);
		assertTrue(testSlot.isOpen == returnedSlot.isOpen);
		assertTrue(testSlot.meetingName.equals(returnedSlot.meetingName));
		assertTrue(testSlot.slotDate.isEqual(returnedSlot.slotDate));
		assertTrue(testSlot.startTime == returnedSlot.startTime);
		
		dao.deleteTimeSlot(testSlot);
	}

	//TimeSlot
	@Test
	public void testSetMeeting() {
		testSlot.setMeeting("howdy");
		
		assertEquals(testSlot.meetingName, "howdy");
		assertEquals(testSlot.hasMeeting, true);
		assertEquals(testSlot.isOpen, false);
	}
	
	@Test
	public void testIsCorrectCode() {
		assertTrue(testSlot.isCorrectCode(1234));
		
		assertFalse(testSlot.isCorrectCode(0123));
	}
	
	public void testDeleteMeeting() {
		testSlot.setMeeting("howdy");
		assertTrue(testSlot.deleteMeeting());
		
		assertEquals(testSlot.meetingName, " ");
		assertEquals(testSlot.isOpen, true);
		assertEquals(testSlot.hasMeeting, false);
		
		assertFalse(testSlot.deleteMeeting());
	}
	
	public void testCreateMeeting() {
		assertTrue(testSlot.createMeeting("help"));
		
		assertEquals(testSlot.meetingName, "help");
		assertEquals(testSlot.isOpen, false);
		assertEquals(testSlot.hasMeeting, true);
		
		assertFalse(testSlot.createMeeting("me"));
	}
	
	
	TimeSlot createTimeSlot() {
		TimeSlot mySlot;
		LocalTime startTime = LocalTime.parse("03:00:00");
		LocalDate slotDate = LocalDate.parse("2018-12-14");
		String id = "test1";
		String sid = "1";
		int secretCode = 1234;
		boolean isOpen = true;
		boolean hasMeeting = false;
		mySlot = new TimeSlot(startTime, slotDate, id, sid, secretCode, isOpen, hasMeeting);
		return mySlot;
	}
}
