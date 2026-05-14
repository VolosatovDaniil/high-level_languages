package com.example.mycourseapp

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton

class CatalogActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_catalog)

        findViewById<MaterialButton>(R.id.btnGoToMyCourses).setOnClickListener {
            startActivity(Intent(this, MyCoursesActivity::class.java))
        }

        setupBuyButton(findViewById(R.id.btnBuyCourse1), 1, "Англійську")
        setupBuyButton(findViewById(R.id.btnBuyCourse2), 2, "Німецьку")
        setupBuyButton(findViewById(R.id.btnBuyCourse3), 3, "Французьку")
    }

    private fun setupBuyButton(button: MaterialButton, courseId: Int, name: String) {
        button.setOnClickListener {
            val alreadyBought = when(courseId) {
                1 -> CourseManager.isEnglishBought
                2 -> CourseManager.isGermanBought
                else -> CourseManager.isFrenchBought
            }

            if (alreadyBought) {
                Toast.makeText(this, "Ви вже записані!", Toast.LENGTH_SHORT).show()
            } else {
                when(courseId) {
                    1 -> CourseManager.isEnglishBought = true
                    2 -> CourseManager.isGermanBought = true
                    else -> CourseManager.isFrenchBought = true
                }
                updateUI()
                Toast.makeText(this, "Успішно записано на $name", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onResume() {
        super.onResume()
        updateUI()
    }

    private fun updateUI() {
        val btn1 = findViewById<MaterialButton>(R.id.btnBuyCourse1)
        val btn2 = findViewById<MaterialButton>(R.id.btnBuyCourse2)
        val btn3 = findViewById<MaterialButton>(R.id.btnBuyCourse3)

        // оновлення кольору кнопок
        updateButtonState(btn1, CourseManager.isEnglishBought)
        updateButtonState(btn2, CourseManager.isGermanBought)
        updateButtonState(btn3, CourseManager.isFrenchBought)

        // оновлення середнього рейтингу
        findViewById<TextView>(R.id.tvAvgRating1).text = "Рейтинг: ${"%.1f".format(CourseManager.getAvgEng())} ★"
        findViewById<TextView>(R.id.tvAvgRating2).text = "Рейтинг: ${"%.1f".format(CourseManager.getAvgGer())} ★"
        findViewById<TextView>(R.id.tvAvgRating3).text = "Рейтинг: ${"%.1f".format(CourseManager.getAvgFre())} ★"
    }

    private fun updateButtonState(button: MaterialButton, isBought: Boolean) {
        if (isBought) {
            button.text = "Ви вже записані"
            button.setBackgroundColor(Color.GRAY)
        } else {
            button.text = "Записатися на курс"
            button.setBackgroundColor(Color.parseColor("#5F27CD"))
        }
    }
}