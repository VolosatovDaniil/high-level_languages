package com.example.mycourseapp

import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView

class MyCoursesActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_my_courses)

        val tvEmpty = findViewById<TextView>(R.id.tvEmptyMessage)
        val statuses = arrayOf("В процесі", "Завершено")
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, statuses)

        // англійська
        val cardEng = findViewById<CardView>(R.id.cvMyCourse1)
        val spinnerEng = findViewById<Spinner>(R.id.spinnerStatus1)
        val rbEng = findViewById<RatingBar>(R.id.rbNewRating1)
        val etEng = findViewById<EditText>(R.id.etReview1)
        val btnSubmitEng = findViewById<Button>(R.id.btnSubmitReview1)
        val btnUnsubEng = findViewById<Button>(R.id.btnUnsubscribe1)

        spinnerEng.adapter = adapter
        spinnerEng.setSelection(if (CourseManager.statusEnglish == "Завершено") 1 else 0)
        spinnerEng.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(p0: AdapterView<*>?, p1: View?, pos: Int, p3: Long) {
                CourseManager.statusEnglish = statuses[pos]
            }
            override fun onNothingSelected(p0: AdapterView<*>?) {}
        }

        btnSubmitEng.setOnClickListener {
            if (rbEng.rating > 0) {
                CourseManager.addRatingEng(rbEng.rating)
                Toast.makeText(this, "Англійська: оцінку збережено!", Toast.LENGTH_SHORT).show()
                etEng.text.clear()
            } else {
                Toast.makeText(this, "Виберіть рейтинг!", Toast.LENGTH_SHORT).show()
            }
        }

        btnUnsubEng.setOnClickListener {
            CourseManager.isEnglishBought = false
            updateUI(tvEmpty)
        }

        // німецька
        val cardGer = findViewById<CardView>(R.id.cvMyCourse2)
        val spinnerGer = findViewById<Spinner>(R.id.spinnerStatus2)
        val rbGer = findViewById<RatingBar>(R.id.rbNewRating2)
        val etGer = findViewById<EditText>(R.id.etReview2)
        val btnSubmitGer = findViewById<Button>(R.id.btnSubmitReview2)
        val btnUnsubGer = findViewById<Button>(R.id.btnUnsubscribe2)

        spinnerGer.adapter = adapter
        spinnerGer.setSelection(if (CourseManager.statusGerman == "Завершено") 1 else 0)
        spinnerGer.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(p0: AdapterView<*>?, p1: View?, pos: Int, p3: Long) {
                CourseManager.statusGerman = statuses[pos]
            }
            override fun onNothingSelected(p0: AdapterView<*>?) {}
        }

        btnSubmitGer.setOnClickListener {
            if (rbGer.rating > 0) {
                CourseManager.addRatingGer(rbGer.rating)
                Toast.makeText(this, "Німецька: оцінку збережено!", Toast.LENGTH_SHORT).show()
                etGer.text.clear()
            }
        }

        btnUnsubGer.setOnClickListener {
            CourseManager.isGermanBought = false
            updateUI(tvEmpty)
        }

        // французька
        val cardFre = findViewById<CardView>(R.id.cvMyCourse3)
        val spinnerFre = findViewById<Spinner>(R.id.spinnerStatus3)
        val rbFre = findViewById<RatingBar>(R.id.rbNewRating3)
        val etFre = findViewById<EditText>(R.id.etReview3)
        val btnSubmitFre = findViewById<Button>(R.id.btnSubmitReview3)
        val btnUnsubFre = findViewById<Button>(R.id.btnUnsubscribe3)

        spinnerFre.adapter = adapter
        spinnerFre.setSelection(if (CourseManager.statusFrench == "Завершено") 1 else 0)
        spinnerFre.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(p0: AdapterView<*>?, p1: View?, pos: Int, p3: Long) {
                CourseManager.statusFrench = statuses[pos]
            }
            override fun onNothingSelected(p0: AdapterView<*>?) {}
        }

        btnSubmitFre.setOnClickListener {
            if (rbFre.rating > 0) {
                CourseManager.addRatingFre(rbFre.rating)
                Toast.makeText(this, "Французька: оцінку збережено!", Toast.LENGTH_SHORT).show()
                etFre.text.clear()
            }
        }

        btnUnsubFre.setOnClickListener {
            CourseManager.isFrenchBought = false
            updateUI(tvEmpty)
        }

        updateUI(tvEmpty)
        findViewById<Button>(R.id.btnBackToCatalog).setOnClickListener {
            finish()
        }
    }

    private fun updateUI(tvEmpty: TextView) {
        val c1 = findViewById<CardView>(R.id.cvMyCourse1)
        val c2 = findViewById<CardView>(R.id.cvMyCourse2)
        val c3 = findViewById<CardView>(R.id.cvMyCourse3)

        c1.visibility = if (CourseManager.isEnglishBought) View.VISIBLE else View.GONE
        c2.visibility = if (CourseManager.isGermanBought) View.VISIBLE else View.GONE
        c3.visibility = if (CourseManager.isFrenchBought) View.VISIBLE else View.GONE

        tvEmpty.visibility = if (!CourseManager.isEnglishBought && !CourseManager.isGermanBought && !CourseManager.isFrenchBought) {
            View.VISIBLE
        } else {
            View.GONE
        }
    }
}