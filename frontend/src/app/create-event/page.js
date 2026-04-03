"use client";
import { useState } from "react";

export default function CreateEvent() {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    date: "",
    location: "",
    venue: "",
    category: "",
    details: {},
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDetailsChange = (e) => {
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async () => {
    if (!formData.eventName || !formData.category) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://event-requirement-app.onrender.com/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Saved:", data);

      setSuccess(true);

      setFormData({
        eventName: "",
        eventType: "",
        date: "",
        location: "",
        venue: "",
        category: "",
        details: {},
      });

      setStep(1);
    } catch (error) {
      console.error(error);
      alert("Error saving event");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-green-500">
          Event Created Successfully 🎉
        </h1>

        <button
          onClick={() => {
            setSuccess(false);
            setStep(1);
          }}
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Another Event
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold mb-6">Create Event</h1>

          <input name="eventName" placeholder="Event Name" className="w-full border p-2 mb-3" onChange={handleChange} />
          <input name="eventType" placeholder="Event Type" className="w-full border p-2 mb-3" onChange={handleChange} />
          <input type="date" name="date" className="w-full border p-2 mb-3" onChange={handleChange} />
          <input name="location" placeholder="Location" className="w-full border p-2 mb-3" onChange={handleChange} />
          <input name="venue" placeholder="Venue (optional)" className="w-full border p-2 mb-3" onChange={handleChange} />

          <select name="category" className="w-full border p-2 mb-3" onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="planner">Event Planner</option>
            <option value="performer">Performer</option>
            <option value="crew">Crew</option>
          </select>

          <button onClick={() => setStep(2)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-bold mb-4">Additional Details</h2>

          {formData.category === "planner" && (
            <>
              <input name="budget" placeholder="Budget" onChange={handleDetailsChange} className="w-full border p-2 mb-3" />
              <input name="guestCount" placeholder="Guest Count" onChange={handleDetailsChange} className="w-full border p-2 mb-3" />
            </>
          )}

          {formData.category === "performer" && (
            <>
              <input name="genre" placeholder="Genre" onChange={handleDetailsChange} className="w-full border p-2 mb-3" />
              <input name="duration" placeholder="Duration" onChange={handleDetailsChange} className="w-full border p-2 mb-3" />
            </>
          )}

          {formData.category === "crew" && (
            <>
              <input name="role" placeholder="Role" onChange={handleDetailsChange} className="w-full border p-2 mb-3" />
              <input name="teamSize" placeholder="Team Size" onChange={handleDetailsChange} className="w-full border p-2 mb-3" />
            </>
          )}

          <button onClick={() => setStep(1)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
            Back
          </button>

          <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
            {loading ? "Saving..." : "Submit"}
          </button>
        </>
      )}
    </div>
  );
}