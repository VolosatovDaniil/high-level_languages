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

        val btnBack = findViewById<Button>(R.id.btnBackToCatalog)
        val tvEmpty = findViewById<TextView>(R.id.tvEmptyMessage)

        val cardEnglish = findViewById<CardView>(R.id.cvMyCourse1)
        val cardGerman = findViewById<CardView>(R.id.cvMyCourse2)
        val cardFrench = findViewById<CardView>(R.id.cvMyCourse3)

        val btnUnsub1 = findViewById<Button>(R.id.btnUnsubscribe1)
        val btnUnsub2 = findViewById<Button>(R.id.btnUnsubscribe2)
        val btnUnsub3 = findViewById<Button>(R.id.btnUnsubscribe3)

        updateUI(cardEnglish, cardGerman, cardFrench, tvEmpty)

        btnBack.setOnClickListener {
            finish()
        }

        // логіка відписки - англійська
        btnUnsub1.setOnClickListener {
            CourseManager.isEnglishBought = false
            Toast.makeText(this, "Відписано від англійської", Toast.LENGTH_SHORT).show()
            updateUI(cardEnglish, cardGerman, cardFrench, tvEmpty)
        }

        // логіка відписки - німецька
        btnUnsub2.setOnClickListener {
            CourseManager.isGermanBought = false
            Toast.makeText(this, "Відписано від німецької", Toast.LENGTH_SHORT).show()
            updateUI(cardEnglish, cardGerman, cardFrench, tvEmpty)
        }

        // логіка відписки - французька
        btnUnsub3.setOnClickListener {
            CourseManager.isFrenchBought = false
            Toast.makeText(this, "Відписано від французької", Toast.LENGTH_SHORT).show()
            updateUI(cardEnglish, cardGerman, cardFrench, tvEmpty)
        }
    }

    private fun updateUI(c1: View, c2: View, c3: View, emptyText: TextView) {
        c1.visibility = if (CourseManager.isEnglishBought) View.VISIBLE else View.GONE
        c2.visibility = if (CourseManager.isGermanBought) View.VISIBLE else View.GONE
        c3.visibility = if (CourseManager.isFrenchBought) View.VISIBLE else View.GONE

        if (!CourseManager.isEnglishBought && !CourseManager.isGermanBought && !CourseManager.isFrenchBought) {
            emptyText.visibility = View.VISIBLE
        } else {
            emptyText.visibility = View.GONE
        }
    }
}